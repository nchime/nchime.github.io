import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      // className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      className="mr-2 mb-2 rounded-full bg-primary-500 px-3 py-1.5 text-xs font-semibold uppercase text-white shadow-sm transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
