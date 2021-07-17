import { createStore } from 'vuex'
import * as storeTypes from './types'
import $http from "@/http"
import urls from "@/http/urls"

export default createStore({
  state: {
    admin: {
      id: '',
      mobile: '',
      password: '',
      create_time: '',
      modify_time: '',
      avatar: '',
    }
  },
  mutations: {
    [storeTypes.UPDATE_ADMIN](state, payload){
      state.admin = payload
    }
  },
  actions: {
    [storeTypes.UPDATE_ADMIN]({ commit }, payload){
      $http.fetch(urls.adminInfo).then( r => {
        if(r.success){
          commit(storeTypes.UPDATE_ADMIN, r.info)
        }
      })
    }
  },
  modules: {
  }
})
