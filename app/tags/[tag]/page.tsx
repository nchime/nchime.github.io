import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const isNewsDigest = (post) => post.tags?.includes('뉴스') && post.tags?.includes('다이제스트')

// Custom URL alias → actual tag mapping
const TAG_ALIASES: Record<string, string> = {
  itnews: '__news_digest__',
}

const TAG_TITLES: Record<string, string> = {
  itnews: 'IT News',
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const displayTitle = TAG_TITLES[tag] || tag
  return genPageMetadata({
    title: displayTitle,
    description: `${siteMetadata.title} ${displayTitle} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  // Standard tags (except news digest tags which have custom URL)
  const paths = tagKeys
    .filter((tag) => tag !== '뉴스')
    .filter((tag) => tag !== '다이제스트')
    .filter((tag) => tag !== '뉴스-다이제스트')
    .map((tag) => ({ tag: encodeURI(tag) }))
  // Custom alias URLs
  paths.push({ tag: 'itnews' })
  return paths
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  // Map custom URL aliases to actual tags
  const actualTag = TAG_ALIASES[tag] || tag
  // Display title
  const displayTitle = TAG_TITLES[tag] || tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  let filteredPosts
  if (actualTag === '__news_digest__') {
    // IT News page: show all news digest posts
    filteredPosts = allCoreContent(sortPosts(allBlogs.filter((post) => isNewsDigest(post))))
  } else {
    // Other tag pages: exclude news digest posts
    filteredPosts = allCoreContent(
      sortPosts(
        allBlogs
          .filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(actualTag))
          .filter((post) => !isNewsDigest(post))
      )
    )
  }
  if (filteredPosts.length === 0) {
    return notFound()
  }
  return <ListLayout posts={filteredPosts} title={displayTitle} />
}
