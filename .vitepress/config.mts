import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tim Cooke",
  description: "Tim Cooke",
  head: [[
      'script', { src: 'https://js-de.sentry-cdn.com/427ec6bd7a7abefb36b2ef7f12b2c325.min.js  ', crossorigin: 'anonymous' }
  ]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'About Me', link: '/aboutme/cv' },
      { text: 'Blog', link: '/blog' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Building this Website', link: '/blog/thiswebsite' }
          ]
        }
      ],
      '/aboutme/': [
        {
          text: 'About me',
          items: [
            { text: 'CV', link: '/aboutme/cv' }
          ]
        }
      ]
    },

    outline: {
      level: 'deep'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/trcooke' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/trcooke/' },
      { icon: 'x', link: 'https://x.com/timdrivendev' }
    ]
  }
})
