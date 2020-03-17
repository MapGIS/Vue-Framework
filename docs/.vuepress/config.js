module.exports = {
    title: "VueMapbox",
    // description: "Combine powers of Mapbox GL JS and Vue.js",
    dest: "dist/docs",
    // head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    // base: "/vue-mapbox/",

    locales: {
        "/": {
            lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
            title: "MapGIS",
            description: "@mapgis/webclient-store"
        }
    },
    themeConfig: {
        locales: {
            "/": {
                selectText: "Languages",
                label: "简体中文",
                ariaLabel: "Languages",
                editLinkText: "Edit this page on GitHub",
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                nav: [
                    {
                        text: "Guide",
                        link: "/guide/"
                    },
                    {
                        text: "API",
                        link: "/api/"
                    },
                    {
                        text: "WebClient",
                        link: "http://develop.smaryun.com:8899/#/index"
                    },
                    { text: "Github", link: "https://github.com/MapGIS/webclient-store" }
                ],

                sidebar: [
                    {
                        title: "Guide",
                        collapsable: false,
                        children: [
                            ["/guide/", "快速上手"],
                        ]
                    },
                    {
                        title: "TypeScript",
                        collapsable: false,
                        children: [
                            ["/typescript/warning.md", "警告"],
                        ]
                    },
                    // ['/plugins/', 'Plugins'],
                ]
                // search: false
            }
        }
    }
};
