# 곽선생 Tech Blog

> Memories are short, but records are forever.

**nchime.github.io** — [https://nchime.github.io](https://nchime.github.io)

Next.js 15 + Tailwind CSS + Contentlayer2 기반의 개인 기술 블로그입니다.  
소프트웨어 엔지니어링, AI, DevOps, 사이드 프로젝트 등의 주제를 다룹니다.

---

## Tech Stack

| 영역       | 기술                                                           |
| ---------- | -------------------------------------------------------------- |
| Framework  | [Next.js 15](https://nextjs.org/) (App Router)                 |
| Styling    | [Tailwind CSS 3](https://tailwindcss.com/)                     |
| Content    | [Contentlayer2](https://github.com/timlrx/contentlayer2) + MDX |
| Analytics  | Google Analytics, Umami                                        |
| Comments   | [Giscus](https://giscus.app/)                                  |
| Search     | [kbar](https://github.com/timc1/kbar)                          |
| Deployment | GitHub Pages (GitHub Actions)                                  |

---

## Features

- MDX 포스트 작성 — JSX 컴포넌트를 마크다운에서 직접 사용 가능
- 태그별 포스트 분류
- 다크 / 라이트 테마
- KaTeX 수식 렌더링
- 코드 블록 신택스 하이라이팅 (rehype-prism-plus)
- kbar 커맨드 팔레트 검색
- Giscus 댓글
- RSS 피드, 사이트맵, SEO 최적화
- AG Grid, ECharts 컴포넌트 통합

---

## Installation

```bash
yarn install
```

## Development

```bash
yarn dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

## Build

```bash
yarn build
```

---

## Project Structure

```
data/
  blog/          # MDX 블로그 포스트
  authors/       # 저자 프로필
  siteMetadata.js  # 사이트 설정
app/             # Next.js App Router 페이지
components/      # React 컴포넌트
layouts/         # 포스트 레이아웃 (PostLayout, PostSimple, PostBanner)
public/static/   # 이미지, 파비콘 등 정적 파일
```

---

## Writing Posts

`data/blog/` 디렉터리에 `.mdx` 파일을 추가합니다.

```markdown
---
title: '포스트 제목'
date: '2025-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: '포스트 요약'
---

본문 내용...
```

지원 프론트매터 필드: `title`, `date`, `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `canonicalUrl`

---

## Deployment

GitHub Actions 워크플로우(`.github/workflows/build-and-deploy.yml`)가 `master` 브랜치에 푸시될 때 자동으로 GitHub Pages에 배포됩니다.

---

## Author

**곽선생 (chkwak)**

- GitHub: [nchime](https://github.com/nchime)
- Email: nchime@gmail.com
- LinkedIn: [nchime](https://www.linkedin.com/in/nchime)
- Threads: [@nchime72](https://www.threads.com/@nchime72)

---

## License

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE)  
블로그 템플릿 원작자: [Timothy Lin](https://www.timlrx.com) (timlrx/tailwind-nextjs-starter-blog)
