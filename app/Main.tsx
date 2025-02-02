import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div
          className="relative space-y-2 pb-8 pt-6 md:space-y-5"
          style={{
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundImage: 'url(/static/images/rb_171060.png)',
          }}
        >
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>
          <p className="text-gray-500 dark:text-gray-400 sm:text-4xl  md:text-3xl md:leading-8 lg:text-base lg:leading-4">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li
                key={slug}
                className="rounded-lg py-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                // className="rounded-lg py-5 transition-transform duration-500 ease-in-out hover:translate-y-[-4px] hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="ml-5 mr-5 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        {post.images && (
                          <img
                            src={post.images}
                            alt={`${title}`}
                            className="border-1 mb-4 mr-4 mt-4 w-full rounded-lg border-gray-300 bg-gray-200"
                          />
                        )}
                      </dd>
                    </dl>
                    <div className=" ml-12 space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          <span className="flex">
                            Read more
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.4}
                              stroke="currentColor"
                              className="ml-0.5 mt-0.5 size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            <span className="flex">
              All Posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.4}
                stroke="currentColor"
                className="ml-0.5 mt-0.5 size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        // <div className="flex items-center justify-center pt-4">
        //   <NewsletterForm />
        // </div>
        <div></div>
      )}
    </>
  )
}
