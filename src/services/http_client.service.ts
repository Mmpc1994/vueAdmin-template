import axios, { AxiosResponse } from 'axios';
import { getToken } from '../utils/auth.ts';
import { request } from 'https';

export interface IResponse<T> {
  code: number
  message: string
  status: string
  data: T
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 15000
});

instance.interceptors.request.use((request) => {
  request.headers.token = getToken();
  return request
})

export class HTTP {
  async get<T>(url: string):Promise<IResponse<T>>{
    try {
      const response: AxiosResponse<IResponse<T>> = await instance.get(url);
      return this.extractData(response)
    } catch (e) {
      throw e
    }
  }

  async post<T>(url: string, query?: any):Promise<IResponse<T>> {
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


  private extractData<T>(res: AxiosResponse):IResponse<T> {
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
