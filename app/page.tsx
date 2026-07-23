import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

const isNewsDigest = (post) => post.tags?.includes('뉴스') && post.tags?.includes('다이제스트')

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const filteredPosts = sortedPosts.filter((post) => !isNewsDigest(post))
  const posts = allCoreContent(filteredPosts)
  return <Main posts={posts} />
}
