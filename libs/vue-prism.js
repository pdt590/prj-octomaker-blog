import Prism from "prismjs"

const VuePrism = {}

VuePrism.install = Vue => {
  Vue.directive('highlight', el => {
    Prism.highlightAll();
  })
}

export default VuePrism