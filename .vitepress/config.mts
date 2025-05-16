import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Tim Cooke",
    description: "Tim Cooke",
    head: [
        [
            'script',
            {async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-BL21M902Z7'}
        ],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BL21M902Z7');`
        ],
        [
            'script', {
            src: 'https://js-de.sentry-cdn.com/427ec6bd7a7abefb36b2ef7f12b2c325.min.js  ',
            crossorigin: 'anonymous'
        }
        ]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'CV', link: '/aboutme/cv'}
        ],

        sidebar: {
            '/aboutme/': [
                {
                    text: 'About me',
                    items: [
                        {text: 'CV', link: '/aboutme/cv'}
                    ]
                }
            ]
        },

        outline: {
            level: 'deep'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/trcooke'},
            {icon: 'linkedin', link: 'https://www.linkedin.com/in/trcooke/'},
            {icon: 'x', link: 'https://x.com/timdrivendev'}
        ]
    }
})
