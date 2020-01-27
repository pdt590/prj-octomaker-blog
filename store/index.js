import Vuex from 'vuex'

import post from './post'
import user from './user'
import shared from './shared'
import query from './query'

export default () => {
  return new Vuex.Store({
    modules: {
      post: post,
      user: user,
      shared: shared,
      query: query
    }
  })
}