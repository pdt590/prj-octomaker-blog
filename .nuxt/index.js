import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_pluginrouting_241bcdae from 'nuxt_plugin_pluginrouting_241bcdae' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_7296ea34 from 'nuxt_plugin_pluginmain_7296ea34' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_components_4e0136ac from 'nuxt_plugin_components_4e0136ac' // Source: ..\\plugins\\components.js (mode: 'all')
import nuxt_plugin_filters_2b4f519a from 'nuxt_plugin_filters_2b4f519a' // Source: ..\\plugins\\filters.js (mode: 'all')
import nuxt_plugin_fc_fb2482ba from 'nuxt_plugin_fc_fb2482ba' // Source: ..\\plugins\\fc.js (mode: 'client')
import nuxt_plugin_ga_fb0a2534 from 'nuxt_plugin_ga_fb0a2534' // Source: ..\\plugins\\ga.js (mode: 'client')
import nuxt_plugin_reloading_47614705 from 'nuxt_plugin_reloading_47614705' // Source: ..\\plugins\\reloading.js (mode: 'client')
import nuxt_plugin_buefy_d1269c2e from 'nuxt_plugin_buefy_d1269c2e' // Source: ..\\plugins\\buefy.js (mode: 'all')
import nuxt_plugin_vuelidate_7b59e9fd from 'nuxt_plugin_vuelidate_7b59e9fd' // Source: ..\\plugins\\vuelidate.js (mode: 'all')
import nuxt_plugin_fontawesome_21e933da from 'nuxt_plugin_fontawesome_21e933da' // Source: ..\\plugins\\fontawesome.js (mode: 'all')
import nuxt_plugin_toc_38238374 from 'nuxt_plugin_toc_38238374' // Source: ..\\plugins\\toc.js (mode: 'all')
import nuxt_plugin_lazyload_69a37db4 from 'nuxt_plugin_lazyload_69a37db4' // Source: ..\\plugins\\lazyload.js (mode: 'client')
import nuxt_plugin_prism_a2e0d826 from 'nuxt_plugin_prism_a2e0d826' // Source: ..\\plugins\\prism.js (mode: 'client')
import nuxt_plugin_test_ec6d0724 from 'nuxt_plugin_test_ec6d0724' // Source: ..\\plugins\\test.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error('inject(key, value) has no value provided')
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__app_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__APP__ && window.__APP__.state) {
      store.replaceState(window.__APP__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_pluginrouting_241bcdae === 'function') {
    await nuxt_plugin_pluginrouting_241bcdae(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_7296ea34 === 'function') {
    await nuxt_plugin_pluginmain_7296ea34(app.context, inject)
  }

  if (typeof nuxt_plugin_components_4e0136ac === 'function') {
    await nuxt_plugin_components_4e0136ac(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_2b4f519a === 'function') {
    await nuxt_plugin_filters_2b4f519a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_fc_fb2482ba === 'function') {
    await nuxt_plugin_fc_fb2482ba(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ga_fb0a2534 === 'function') {
    await nuxt_plugin_ga_fb0a2534(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_reloading_47614705 === 'function') {
    await nuxt_plugin_reloading_47614705(app.context, inject)
  }

  if (typeof nuxt_plugin_buefy_d1269c2e === 'function') {
    await nuxt_plugin_buefy_d1269c2e(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_7b59e9fd === 'function') {
    await nuxt_plugin_vuelidate_7b59e9fd(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_21e933da === 'function') {
    await nuxt_plugin_fontawesome_21e933da(app.context, inject)
  }

  if (typeof nuxt_plugin_toc_38238374 === 'function') {
    await nuxt_plugin_toc_38238374(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lazyload_69a37db4 === 'function') {
    await nuxt_plugin_lazyload_69a37db4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_prism_a2e0d826 === 'function') {
    await nuxt_plugin_prism_a2e0d826(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_test_ec6d0724 === 'function') {
    await nuxt_plugin_test_ec6d0724(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
