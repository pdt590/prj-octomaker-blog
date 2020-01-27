const pkg = require('./package')
const logger = require('connect-logger')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
			{ src: 'https://connect.facebook.net/vi_VN/all.js' }
		],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v1' },
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/bulma.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/addon-fc.js'},
    {src: '~plugins/addon-ga.js'},
    
    {src: '~plugins/plugin-components.js'},
    {src: '~plugins/plugin-buefy.js'},
    {src: '~plugins/plugin-firebase.js'},
    {src: '~plugins/plugin-vuelidate.js'},
    {src: '~plugins/plugin-filter.js'},
    {src: '~plugins/plugin-authListener.js'},
    {src: '~plugins/plugin-lazyload.js', ssr: false},
    {src: '~plugins/plugin-editor', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
	** Global env setting
	*/
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},

  /*
  ** globalName Property
  */
  globalName: 'app',


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },

  serverMiddleware: [logger({ format: "%date %status %method %url (%time)" })]
}
