// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  backgroundImage: {
    'main-img': "url('/static/image/avatar.png')",
  },
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'Consolas', 'Menlo', 'Monaco', '"Courier New"', 'monospace'],
      },
      colors: {
        primary: colors.gray,
        gray: colors.gray,
        neutral: colors.neutral,
        secondary: colors.yellow,
        neon: {
          green: '#39ff14',
          yellow: '#ccff00',
          pink: '#ff00ff',
          blue: '#0ff0fc',
        },
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: theme('colors.gray.800'),
            lineHeight: '1.85',
            letterSpacing: '-0.012em',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            p: {
              fontSize: '1.0625rem', // 17px
              lineHeight: '1.85',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              color: theme('colors.primary.700'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: theme('colors.gray.300'),
              fontWeight: '500',
              transition: 'all 0.15s ease',
              '&:hover': {
                color: theme('colors.primary.950'),
                textDecorationColor: theme('colors.primary.700'),
              },
              code: { color: theme('colors.primary.500') },
            },
            'h1,h2,h3,h4': {
              color: theme('colors.gray.900'),
              wordBreak: 'keep-all',
            },
            h1: {
              fontSize: '2.1rem',
              fontWeight: '800',
              lineHeight: '1.3',
              letterSpacing: '-0.025em',
              marginTop: '2.2em',
              marginBottom: '0.8em',
            },
            h2: {
              fontSize: '1.55rem',
              fontWeight: '700',
              lineHeight: '1.35',
              letterSpacing: '-0.02em',
              marginTop: '2.6em',
              marginBottom: '0.8em',
              paddingBottom: '0.4em',
              borderBottom: `1px solid ${theme('colors.gray.200')}`,
            },
            h3: {
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.45',
              letterSpacing: '-0.015em',
              marginTop: '2em',
              marginBottom: '0.6em',
            },
            h4: {
              fontSize: '1.1rem',
              fontWeight: '600',
              lineHeight: '1.5',
              marginTop: '1.6em',
              marginBottom: '0.5em',
            },
            ul: {
              marginTop: '1.2em',
              marginBottom: '1.2em',
              paddingLeft: '1.5em',
            },
            ol: {
              marginTop: '1.2em',
              marginBottom: '1.2em',
              paddingLeft: '1.5em',
            },
            li: {
              fontSize: '1.025rem',
              lineHeight: '1.8',
              marginTop: '0.45em',
              marginBottom: '0.45em',
              wordBreak: 'keep-all',
            },
            'li > p': {
              marginTop: '0.3em',
              marginBottom: '0.3em',
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '1.8',
              letterSpacing: '-0.01em',
              color: theme('colors.gray.700'),
              backgroundColor: theme('colors.gray.50'),
              borderLeftColor: theme('colors.gray.400'),
              borderLeftWidth: '4px',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '1rem 1.25rem',
              marginTop: '1.8em',
              marginBottom: '1.8em',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '2.8em',
              marginBottom: '2.8em',
            },
            table: {
              width: '100%',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.925rem',
              lineHeight: '1.6',
            },
            thead: {
              borderBottomColor: theme('colors.gray.300'),
            },
            'thead th': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              padding: '0.75rem 1rem',
              backgroundColor: theme('colors.gray.50'),
            },
            'tbody td': {
              padding: '0.75rem 1rem',
              verticalAlign: 'top',
              borderBottomColor: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
              border: `1px solid ${theme('colors.gray.200')}`,
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              borderRadius: '0.5rem',
              padding: '1.25rem 1.5rem',
              lineHeight: '1.7',
              fontSize: '0.9rem',
              marginTop: '1.8em',
              marginBottom: '1.8em',
              overflowX: 'auto',
              code: {
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: '400',
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              textDecorationColor: theme('colors.gray.600'),
              '&:hover': {
                color: theme('colors.gray.100'),
                textDecorationColor: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            h2: {
              borderBottomColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              backgroundColor: 'rgba(31, 41, 55, 0.4)',
              borderLeftColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.800'),
            },
            'thead th': {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.900'),
            },
            thead: {
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody td': {
              borderBottomColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.400'),
              backgroundColor: theme('colors.gray.800'),
              border: `1px solid ${theme('colors.gray.700')}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
