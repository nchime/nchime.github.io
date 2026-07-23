import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import 'animate.css'
import Image from 'next/image'

const getAbbrev = (title: string) => {
  const engLetters = title.match(/[A-Za-z]/g)
  if (engLetters) return engLetters.join('').slice(0, 2)
  return title.slice(0, 1)
}

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white  dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="p-l:12 flex items-center justify-between">
          <div className="animate__animated animate__heartBeat mr-3">
            <Image
              src="/static/images/nchime_avatar.png"
              alt="nchime avatar"
              width={50}
              height={50}
              priority
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="font-semibold sm:leading-10 md:text-2xl md:leading-14">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="hidden items-center space-x-1 sm:flex sm:space-x-2">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group relative flex items-center justify-center rounded-lg px-1.5 py-1 font-medium text-gray-900 transition-all duration-200 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {/* Abbreviation: hidden on hover, keeps space */}
                <span className="transition-all duration-200 group-hover:invisible">
                  {getAbbrev(link.title)}
                </span>
                {/* Full title: overlay on hover */}
                <span className="absolute left-0 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm invisible group-hover:visible dark:border-gray-600 dark:bg-gray-950">
                  {link.title}
                </span>
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
