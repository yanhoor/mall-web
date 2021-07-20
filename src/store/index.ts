import { createStore } from 'vuex'
import * as storeTypes from './types'
import $http from "@/http"
import urls from "@/http/urls"
import permission from './modules/permission'

export default createStore({
  modules: {
    permission,
  },
  state: {
    admin: null
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
          }
        })
      })
    }
  },
})
