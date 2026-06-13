#!/usr/bin/env node
/**
 * AI Latest News → Blog Post Generator
 *
 * 매일 오전 2시(KST)에 실행되어 AI 최신 뉴스를 검색하고
 * 블로그 포스트(MDX)를 자동 생성합니다.
 *
 * Usage: node scripts/generate-ai-news.mjs
 */

import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const BLOG_DIR = join(process.cwd(), 'data', 'blog')

// ─── 공통 파서 ────────────────────────────────────────────────

function parseRSSItems(text, maxItems = 10) {
  const items = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  const slicer = maxItems ? items.slice(0, maxItems) : items
  return slicer
    .map(([, content]) => {
      const title =
        content.match(/<title><!\[CDATA\[(.*?)\]\]>/)?.[1] ||
        content.match(/<title>(.*?)<\/title>/)?.[1] ||
        ''
      const link =
        content.match(/<link>(.*?)<\/link>/)?.[1] || content.match(/<guid>(.*?)<\/guid>/)?.[1] || ''
      const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      const description =
        content.match(/<description><!\[CDATA\[(.*?)\]\]>/)?.[1] ||
        content.match(/<description>(.*?)<\/description>/)?.[1] ||
        ''
      const cleanDesc = description
        .replace(/<[^>]*>/g, '')
        .replace(/&[^;]+;/g, ' ')
        .trim()
        .slice(0, 300)
      const dateMatch = content.match(/<dc:date>(.*?)<\/dc:date>/)?.[1]
      return {
        title,
        link,
        pubDate: pubDate || dateMatch || '',
        description: cleanDesc,
      }
    })
    .filter((item) => item.title && item.link)
}

// ─── 뉴스 소스 ───────────────────────────────────────────────

const NEWS_SOURCES = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10).map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10).map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10).map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: 'GeekNews',
    url: 'https://news.hada.io/rss/news',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10).map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: 'AI타임스',
    url: 'https://cdn.aitimes.com/rss/gn_rss_allArticle.xml',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10).map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: '지다넷코리아',
    url: 'https://feeds.feedburner.com/zdkorea',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 10)
        .filter((item) => {
          // 지다넷은 전체 IT 뉴스이므로 AI 관련만 필터
          const isAI = /AI|인공지능|LLM|GPT|머신러닝|딥러닝|챗봇|생성형|언어모델/i.test(
            item.title + item.description
          )
          return isAI
        })
        .map((item) => ({ ...item, source: this.name }))
    },
  },
  {
    name: 'arXiv AI/ML',
    url: 'https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=10',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      const entries = [...text.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      return entries
        .map(([, content]) => {
          const title =
            content
              .match(/<title>([\s\S]*?)<\/title>/)?.[1]
              ?.replace(/\s+/g, ' ')
              .trim() || ''
          const link = content.match(/<id>(.*?)<\/id>/)?.[1] || ''
          const published = content.match(/<published>(.*?)<\/published>/)?.[1] || ''
          const summary =
            content
              .match(/<summary>([\s\S]*?)<\/summary>/)?.[1]
              ?.replace(/\s+/g, ' ')
              .trim()
              .slice(0, 300) || ''
          return { title, link, pubDate: published, description: summary, source: this.name }
        })
        .filter((item) => item.title && item.link)
    },
  },
  {
    name: 'HackerNews AI',
    url: 'https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+machine+learning+OR+deep+learning&count=15',
    async fetch() {
      const res = await fetch(this.url)
      const text = await res.text()
      return parseRSSItems(text, 15).map((item) => ({ ...item, source: this.name }))
    },
  },
]

// ─── 유틸리티 ─────────────────────────────────────────────────

function formatDate(date) {
  const d = new Date(date)
  return d.toISOString().slice(0, 10)
}

function deduplicateNews(allNews) {
  const seen = new Set()
  return allNews.filter((item) => {
    const key = item.title.toLowerCase().replace(/\s+/g, ' ').trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function sortByDate(news) {
  return news.sort((a, b) => {
    const dateA = new Date(a.pubDate || 0)
    const dateB = new Date(b.pubDate || 0)
    return dateB - dateA
  })
}

// ─── MDX 생성 ────────────────────────────────────────────────

function generateMDX(newsItems, dateStr) {
  const today = new Date(dateStr)
  const dateDisplay = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const newsList = newsItems
    .map((item, i) => {
      const link = item.link || '#'
      const source = item.source || ''
      const pubDateStr = item.pubDate
        ? new Date(item.pubDate).toLocaleDateString('ko-KR')
        : '날짜 없음'
      return `### ${i + 1}. ${item.title}

${item.description || '요약 정보가 없습니다.'}

- **출처**: [${source}](${link})
- **원문 링크**: [${link}](${link})
- **게시일**: ${pubDateStr}
`
    })
    .join('\n---\n\n')

  return `---
title: '오늘의 AI 소식 - ${dateDisplay}'
date: '${dateStr}'
tags: ['AI', '뉴스', '다이제스트']
draft: false
images: ['/images/ai-news/digest-cover.png']
summary: 'AI 분야의 최신 뉴스를 요약한 일일 다이제스트입니다. 오늘 수집된 주요 AI/ML 관련 뉴스 ${newsItems.length}건을 엄선하여 소개합니다.'
---

> 📰 이 글은 AI 최신 뉴스를 자동으로 수집·요약하여 매일 오전 2시에 게시됩니다.

## 오늘의 AI 뉴스 TOP ${newsItems.length}

${newsList}

---

*이 포스트는 자동 생성되었습니다. 최신 뉴스는 각 출처 링크에서 확인하세요.*
`
}

// ─── 메인 로직 ───────────────────────────────────────────────

async function main() {
  const today = new Date()
  const dateStr = formatDate(today)
  const filename = `${dateStr}-ai-news-digest.mdx`
  const filepath = join(BLOG_DIR, filename)

  // 이미 오늘 글이 있으면 스킵
  if (existsSync(filepath)) {
    console.log(`✅ 오늘의 AI 뉴스 이미 존재: ${filename}`)
    process.exit(0)
  }

  console.log('🔍 AI 뉴스 수집 시작...')

  // 모든 소스에서 뉴스 수집
  const allNews = []
  for (const source of NEWS_SOURCES) {
    try {
      console.log(`  📡 ${source.name}에서 가져오는 중...`)
      const items = await source.fetch()
      console.log(`    → ${items.length}건 수집`)
      allNews.push(...items)
    } catch (err) {
      console.error(`    ✗ ${source.name} 실패: ${err.message}`)
    }
  }

  console.log(`\n📊 총 수집: ${allNews.length}건`)

  // 중복 제거 & 정렬 & 상위 10개 선별
  const deduped = deduplicateNews(allNews)
  const sorted = sortByDate(deduped)
  const top10 = sorted.slice(0, 10)

  console.log(`📝 선별 후: ${top10.length}건`)

  if (top10.length === 0) {
    console.error('❌ 수집된 뉴스가 없습니다.')
    process.exit(1)
  }

  // MDX 파일 생성
  const mdx = generateMDX(top10, dateStr)
  writeFileSync(filepath, mdx, 'utf-8')

  console.log(`\n✅ 블로그 글 생성 완료: ${filename}`)
  console.log(`   경로: ${filepath}`)
  console.log(`   뉴스: ${top10.length}건`)

  // Prettier 포맷 (GitHub Actions 빌드 에러 방지)
  try {
    console.log('\n🎨 Prettier 포맷 실행...')
    execSync(`npx prettier --write "${filepath}"`, { cwd: process.cwd(), encoding: 'utf-8' })
    console.log('   ✅ Prettier 포맷 완료')
  } catch (prettierErr) {
    console.error(`   ⚠️ Prettier 실패: ${prettierErr.message} — 포맷 없이 계속 진행`)
  }

  // Git commit & push
  try {
    console.log('\n📦 Git commit & push 시작...')
    const projectDir = join(process.cwd())

    // Check if there are changes
    const status = execSync('git status --porcelain', { cwd: projectDir, encoding: 'utf-8' }).trim()
    if (!status) {
      console.log('   변경사항 없음 — 스킵')
      return
    }

    // Configure git user if not set (for CI/automated environments)
    try {
      execSync('git config user.email', { cwd: projectDir, encoding: 'utf-8' })
    } catch {
      execSync('git config user.email "bot@nchime.github.io"', { cwd: projectDir })
      execSync('git config user.name "AI News Bot"', { cwd: projectDir })
    }

    // Stage, commit, push
    execSync(`git add "${filepath}"`, { cwd: projectDir })
    const commitMessage = `🤖 AI 뉴스 다이제스트 자동 생성 — ${dateStr} (${top10.length}건)`
    execSync(`git commit -m "${commitMessage}"`, { cwd: projectDir })
    console.log(`   ✅ 커밋 완료: ${commitMessage}`)

    // Push — use current branch
    const branch =
      execSync('git branch --show-current', { cwd: projectDir, encoding: 'utf-8' }).trim() || 'main'
    execSync(`git push origin ${branch}`, { cwd: projectDir })
    console.log(`   ✅ 푸시 완료 → origin/${branch}`)
  } catch (gitErr) {
    console.error(`   ✗ Git 실패: ${gitErr.message}`)
    // Don't exit with error — the blog post was still created
  }
}

main().catch((err) => {
  console.error('❌ 스크립트 실패:', err)
  process.exit(1)
})
