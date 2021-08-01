import { createStore } from 'vuex'
import * as storeTypes from './types'
import $http from "@/http"
import urls from "@/http/urls"
import permission from './modules/permission'
import { initAsyncRoutes } from '@/router'


export default createStore({
  modules: {
    permission,
  },
  state: {
    admin: null
  },
  getters: {
    shopId(state, getters){
      const admin = state.admin as any
      return admin?.shop_id
    }
  },
  mutations: {
    [storeTypes.UPDATE_ADMIN](state, payload){
      state.admin = payload
    }
  },
  actions: {
    [storeTypes.UPDATE_ADMIN]({ commit }): Promise<any>{
      return new Promise( (resolve, reject) => {
        $http.fetch(urls.adminInfo).then( r => {
          if(r.success){
            commit(storeTypes.UPDATE_ADMIN, r.info)
            resolve(r.info)
            initAsyncRoutes()
          }
        })
      })
    }
  },
})
