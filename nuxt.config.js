const pkg = require('./package')

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    {src: '~plugins/plugin-buefy.js'},
    {src: '~plugins/plugin-firebase.js'},
    {src: '~plugins/plugin-vuelidate.js'},
    {src: '~plugins/plugin-lazyload.js', ssr: false}
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
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
