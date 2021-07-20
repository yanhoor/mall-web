import { asyncRoutes, constantRoutes } from '@/router'
import * as storeTypes from '../types'

function checkPermission(route: any, roles: Array<string>){
    if(route.meta && route.meta.roles){
        return roles.some((role) => route.meta.roles.includes(role))
    }else{
        return true
    }
}

function filterAuthRoutes(routes: any, roles: Array<string>){
    let result: any[] = []
    routes.forEach((route: any) => {
        let tmp = {...route}
        if(checkPermission(tmp, roles)){
            if(tmp.children) tmp.children = filterAuthRoutes(tmp.children, roles)
            result.push(tmp)
        }
    })
    return result
}

export default {
    namespaced: true,
    state: {
        asyncRoutes: [],
        allRoutes: [],
    },
    mutations: {
        [storeTypes.GENERATE_ROUTES](state: any, routes: Array<any>){
            state.asyncRoutes = routes
            state.allRoutes = constantRoutes.concat(routes)
        }
    },
    actions: {
        [storeTypes.GENERATE_ROUTES]({ commit }: any, roles: Array<string> = []){
            console.log('asyncRoutes-----', asyncRoutes, roles)
            return new Promise((resolve, reject) => {
                let result: any[] = []
                if(roles.includes('super')){
                    result = asyncRoutes
                }else{
                    result = filterAuthRoutes(asyncRoutes, roles)
                }
                commit(storeTypes.GENERATE_ROUTES, result)
                resolve(result)
            })
        },
    }
}
