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
                            ["/guide/", "Quickstart"],
                            ["/guide/basemap.md", "Base map"],
                            ["/guide/composition.md", "Composition"],
                            ["/guide/controls.md", "Controls"],
                            ["/guide/markers&popups.md", "Markers and popups"],
                            ["/guide/layers&sources.md", "Layers and sources"]
                        ]
                    },
                    {
                        title: "API",
                        collapsable: false,
                        children: [
                            ["/api/", "GlMap"],
                            ["/api/controls.md", "Controls"],
                            ["/api/marker.md", "MapMarker"]
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
