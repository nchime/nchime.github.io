import Link from 'next/link'
import { slug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      // className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      className="mr-2 rounded-full bg-slate-300 px-3 py-1 text-xs font-medium uppercase text-primary-600 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {text.split(' ').join('-')}
      {siteMetadata.title}
      {siteMetadata.googleAnalytics}
      --
      {process.env.NEXT_PUBLIC_GA_CODE}
    </Link>
  )
}

export default Tag
