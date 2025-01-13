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
      className="mr-2 px-3 py-1 bg-slate-400 text-white text-xs font-medium uppercase rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
