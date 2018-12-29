import axios, { AxiosResponse } from 'axios';
import store from '../store';
import  router  from '../router';
import { Message } from 'element-ui'

export interface IResponse<T> {
  code: number
  message: string
  status: string
  data: T
}

const instance = axios.create({
  baseURL: '/b2b/api',
  timeout: 35000
});

instance.interceptors.request.use((config) => {
  if (store.getters.userToken) {
    config.headers.Authorization = 'cat ' + store.getters.userToken;
  }
  return config
})

instance.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    console.log('用户没有登入');
    router.replace({
      name: 'Login'
    })
  } else if (response.data.code === 411) {
    console.log('token 过期');
    store.commit('SET_USER_TOKEN', '');
    router.replace({
      name: 'Login'
    });
  }
  return response
})

export class HTTP {
  async get<T>(url: string, config?: any):Promise<IResponse<T>>{
    try {
      const response: AxiosResponse<IResponse<T>> = await instance.get(url, config);
      return this.extractData(response)
    } catch (e) {
      throw e
    }
  }

  async post<T>(url: string, query?: any, config?: any):Promise<IResponse<T>> {
    try {
      const response: AxiosResponse<IResponse<T>> = await instance.post(url, query);
      return this.extractData(response)
    } catch (e) {
      throw e
    }
  }

  async put<T>(url: string, query?: any, config?: any):Promise<IResponse<T>> {
    try {
      const response: AxiosResponse<IResponse<T>> = await instance.put(url, query)
      return this.extractData(response)
    } catch (e) {
      throw e
    }
  }

  async delete<T>(url: string, query?: any, config?: any):Promise<IResponse<T>> {
    try {
      const response: AxiosResponse<IResponse<T>> = await instance.delete(url, query)
      return this.extractData(response)
    } catch (e) {
      throw e
    }
  }


  private extractData<T>(res: AxiosResponse):IResponse<T> {
    if (res.data.code !== 200) {
      Message(res.data.message)
    }
    return res.data
  }
  private errorHandler(error: any) {
    // 对不同的错误进行不同的处理
  }

  static encodeSearchParams(obj: any): string {
    const params = Object.keys(obj).filter((key: string) => {
      return !!obj[key]
    }).map((key: string) => {
      // 对于需要编码的文本（比如说中文）我们要进行编码
      return [key, encodeURIComponent(obj[key])].join('=')
    })
  
    return params.join('&')
  }
}

export const http = new HTTP();
