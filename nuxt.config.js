const pkg = require("./package");
const logger = require("connect-logger");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "OctoMaker",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "OctoMaker - Share to be viral"
      },
      { hid: "og-url", property: "og:url", content: `${process.env.baseUrl}` },
      { hid: "og-title", property: "og:title", content: "OctoMaker" },
      {
        hid: "og-description",
        property: "og:description",
        content: "Share to be viral"
      },
      {
        hid: "og-image",
        property: "og:image",
        content: `${process.env.BASE_URL}/icon-photo.png`
      },
      { hid: "fb-app_id", property: "fb:app_id", content: "192142251994813" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#FFFFFF" },

  /*
   ** Global CSS
   */
  css: [
    "~assets/styles/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Own plugins
    { src: "~plugins/components.js" },
    { src: "~plugins/filters.js" },
    { src: "~plugins/fc.js", mode: "client" },
    { src: "~plugins/ga.js", mode: "client" },
    { src: "~plugins/reloading.js", mode: "client" },

    { src: "~plugins/buefy.js" },
    { src: "~plugins/vuelidate.js" },
    { src: "~plugins/fontawesome.js" },
    { src: "~plugins/toc.js" },
    { src: "~plugins/lazyload.js", mode: "client" },
    { src: "~plugins/prism.js", mode: "client" },

    { src: "~plugins/test.js", mode: "client" }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "nuxt-i18n",
      {
        locales: [
          {
            code: "en",
            name: "En",
            iso: "en-US",
            file: "en-US.js"
          },
          {
            code: "vi",
            name: "Vi",
            iso: "vi-VN",
            file: "vi-VN.js"
          }
        ],
        defaultLocale: "en",
        lazy: true,
        langDir: "lang/",
        baseUrl: process.env.BASE_URL || "http://localhost:3000"
      }
    ],
    [
      "@nuxtjs/component-cache",
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ],
    ["@bazzite/nuxt-optimized-images"]
  ],

  /*
   ** @bazzite/nuxt-optimized-images setting
   */
  optimizedImages: {
    optimizeImages: true
  },

  /*
   ** Create environment variables client side, also to be shared from server side.
   */
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    production: process.env.NODE_ENV
  },

  /*
   ** Define the development or production mode of Nuxt.js.
   ** 'dev' is forced to true with nuxt
   ** 'dev' is forced to false with nuxt build, nuxt start and nuxt generate 
   */
  dev: (process.env.NODE_ENV !== 'production'),

  /*
   ** GlobalName Property
   */
  globalName: "app",

  /*
   ** Customize runtime options for rendering pages
   */
  render: {
    resourceHints: false,
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },

  /*
   ** Customize middleware.
   ** ServerMiddleware property runs server-side before
   ** vue-server-renderer and can be used for server
   ** specific tasks
   */
  serverMiddleware: [logger({ format: "%date %status %method %url (%time)" })],

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
