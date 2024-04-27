/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export interface HttpClientParams {
  url: string;
  config?: Omit<AxiosRequestConfig, 'url' | 'headers'>;
  version?: string;
  headers?: Record<string, string>;
}

export interface HttpClientParamsWithData<T = any> extends HttpClientParams {
  config?: Omit<AxiosRequestConfig, 'url' | 'headers' | 'data'>;
  data?: T;
}

export interface HttpClient {
  get<T = any>(params: HttpClientParams): AxiosPromise<T>;
  delete<T = any>(params: HttpClientParams): AxiosPromise<T>;
  head<T = any>(params: HttpClientParams): AxiosPromise<T>;
  post<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  put<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  patch<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
}
