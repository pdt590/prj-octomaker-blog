import Vue from 'vue'

Vue.prototype.$initFbSDK = () => {
  FB.init({
    appId: '359102328229283',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.2'
  })
}