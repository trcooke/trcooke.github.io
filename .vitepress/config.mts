import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tim Cooke",
  description: "Tim Cooke",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' }
    ],

    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: 'Building this Website', link: '/blog/thiswebsite' }
        ]
      },
      {
        text: 'About me',
        items: [
          { text: 'CV', link: '/cv' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/trcooke' }
    ]
  }
})
