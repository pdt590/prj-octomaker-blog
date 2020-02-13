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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
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
    '~assets/styles/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // Own plugins    
    {src: '~plugins/components.js'},
    {src: '~plugins/filters.js'},
    {src: '~plugins/fc.js', mode: 'client'},
    {src: '~plugins/ga.js', mode: 'client'},
    {src: '~plugins/authevent.js', mode: 'client'},

    {src: '~plugins/buefy.js'},
    {src: '~plugins/vuelidate.js'},
    {src: '~plugins/fontawesome.js'},
    {src: '~plugins/lazyload.js', mode: 'client'},
    {src: '~plugins/simplemde.js', mode: 'client' },
    {src: '~plugins/prism.js', mode: 'client' },

    {src: '~plugins/test.js', mode: 'client' }
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
