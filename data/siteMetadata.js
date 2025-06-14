/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  // title: 'Next.js Starter Blog',
  title: '곽선생 Tech Blog',

  author: 'chkwak',
  headerTitle: '곽선생 Tech Blog',
  // headerTitle: process.env.NEXT_PUBLIC_TITLE_NAME ? process.env.NEXT_PUBLIC_TITLE_NAME : process.env.TITLE_NAME,
  // // description: 'A blog created with Next.js and Tailwind.css',
  description: 'Memories are short, but records are forever',
  blogdescription: 'We live, not as we wish, but as we can.',
  // language: 'en-us',
  language: 'ko-kr',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
  // siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/nchime_avatar.png`,
  // socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/nchime_avatar.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'nchime@gmail.com',
  github: 'https://github.com/nchime',
  // x: 'https://twitter.com/x',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://facebook.com/neochime',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/nchime',
  threads: 'https://www.threads.com/@nchime72',
  // instagram: 'https://www.instagram.com',
  // medium: 'https://medium.com',
  // bluesky: 'https://bsky.app/',
  locale: 'en-US',
  // locale: 'ko-KR',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
    googleAnalytics: {
      googleAnalyticsId: 'G-H76R7051QG', // e.g. G-XXXXXXX
      // googleAnalyticsId: process.env.NEXT_PUBLIC_GA_CODE,
      // googleAnalyticsId: process.env.NEXT_PUBLIC_GA_CODE
      //   ? process.env.NEXT_PUBLIC_GA_CODE
      //   : process.env.GA_CODE,
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
  quotes: [
    // Life Wisdom
    "Your smile can change someone's entire day.",
    'Failure is the first step toward success.',
    "Today's dreams become tomorrow's reality.",
    'Your limits are set by your mind.',
    'Small progress is still progress.',

    // Challenge & Growth
    'Life begins outside your comfort zone.',
    'Impossible is just something not yet tried.',
    "Don't fear failure, fear not trying.",
    'Your future depends on what you do today.',
    "Don't avoid obstacles while chasing your dreams; overcome them.",

    // Self-Development
    'A 1% improvement daily becomes 365% in a year.',
    'Your thoughts shape your reality.',
    "Don't compare yourself to others, compare yourself to who you were yesterday.",
    'Mistakes are opportunities to learn.',
    'Your passion is the key to your success.',

    // Relationships
    'Sincerity is the best way to win hearts.',
    'Kindness is free but its value is infinite.',
    'Great relationships start with understanding and respect.',
    'True friends believe in your potential.',
    'Love multiplies when shared.',

    // Success & Goals
    'The secret to achieving goals is to begin.',
    'Success comes to those who are prepared.',
    "If your dreams don't scare you, they aren't big enough.",
    "When you feel like giving up, you're closest to success.",
    'Small actions create big changes.',

    // Positive Mindset
    'Positive thoughts create a positive life.',
    "Today's struggles are tomorrow's blessings.",
    'Your attitude determines your life.',
    'Happiness is a choice.',
    'A grateful heart attracts more blessings.',
  ],
}

module.exports = siteMetadata
