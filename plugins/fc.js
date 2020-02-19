import Vue from 'vue'

Vue.prototype.$initFbSdk = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: '192142251994813',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.1'
    })
  }
  setTimeout(() => {
    FB.XFBML.parse();
  }, 2000);
}

export default ({ app }) => {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/all.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}