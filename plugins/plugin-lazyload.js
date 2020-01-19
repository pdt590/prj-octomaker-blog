import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const options = {
    error: `${process.env.baseUrl}/loading.gif`,
    loading: `${process.env.baseUrl}/loading.gif`,
    observer: true,
}

Vue.use(VueLazyload, options)