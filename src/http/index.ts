import axios, {AxiosRequestConfig} from 'axios';
import PageStateModel from "@/model/page_state_model";
import router from '@/router'

const baseURL = process.env.VUE_APP_ENV === 'dev' ? '/api' : process.env.VUE_APP_BASE_URL;

const DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: baseURL,
    timeout: 45000,
    withCredentials: true,
    method: 'post',
    headers: {
        mobile_login_token: '3333333333'
    }
};

class Http {
    api = axios.create();

    constructor() {
        // 请求拦截配置
        this.api.interceptors.request.use(config => {
            // console.log(`请求拦截配置-->`, config);
            return config; // 需要返回
        }, error => {
            console.log(`请求拦截出错--> `, error);
            return Promise.reject(error);
        })

        // 响应拦截配置
        this.api.interceptors.response.use(response => {
            // console.table(`响应拦截-->`, response.data);
            if(response.data.code == 900 && router.currentRoute.value.path != '/login'){
                router.push({
                    path: '/login',
                    query: {
                        from: router.currentRoute.value.fullPath
                    }
                })
            }
            return response.data;
        }, error => {
            console.log(`响应拦截出错-->`, error);
            return Promise.reject(error);
        })
    }

    async fetch(url: string, params?: FetchParams, options?: RequestOptions, model?: PageStateModel): Promise<any> {
        const op = Object.assign({}, DEFAULT_CONFIG, options);
        const {formData, loading, method} = op;
        const reqConfig = {...DEFAULT_CONFIG, url, method};
        if (method === 'get') {
            reqConfig.method = method;
            reqConfig.params = params;
        } else if (formData) {
            const formData = new FormData();
            const par = params ?? {};
            Object.keys(par).forEach(key => {
                formData.append(key, par[key])
            })
            reqConfig.data = formData;
        } else {
            reqConfig.data = params;
        }
        return new Promise((resolve, reject) => {
            this.api.request(reqConfig).then(res => {
                return resolve(res);
            }).catch(e => {
                return reject(e);
            });
        });
    }
}

const $http = new Http();

export default $http

declare global {
    /*
    * 网络请求参数
    * */
    interface FetchParams {
        [prop: string]: any,
    }

    /**
     * 网络请求返回值
     */
    interface RequestRes {
        /** 状态码,成功返回 200 */
        code: number
        /** 错误消息 */
        message: string
        /** 返回数据 */
        result: any

        // [prop: string]: any,
    }

    /*
    * 请求选项
    * */
    interface RequestOptions extends AxiosRequestConfig {
        baseUrl?: string;
        // 是否使用formData
        formData?: boolean;
        timeOut?: number;
        // 是否显示loading
        loading?: boolean;
    }
}
