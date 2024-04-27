/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import axios, { AxiosPromise, AxiosError } from 'axios';
import qs from 'qs';

import {
  HttpClient,
  HttpClientParams,
  HttpClientParamsWithData,
} from './types';
import { constructUrl } from './lib';

/**
 * ### Метод создает и возращает объект axiosInstance
 *
 * @param serviceName - название сервиса
 * @param apiVersion - версия API
 *
 * @returns объект AxiosInstance
 */
export const createHttpClient = ({
  serviceName = '',
  apiVersion = 'v1',
  errorHandler,
}: {
  serviceName?: string;
  apiVersion?: string;
  errorHandler?: (error: AxiosError) => Error;
} = {}): HttpClient => {
  const axiosInstance = axios.create({
    paramsSerializer: (queryParams) =>
      qs.stringify(queryParams, { arrayFormat: 'indices' }),
  });

  if (errorHandler) {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(errorHandler(error)),
    );
  }

  /**
   * ### Метод для отправки GET-запроса
   *
   * @param params - параметры
   *
   * @returns Результат ответа от сервера
   */
  const get = <T = any>({
    version = apiVersion,
    url,
    headers,
    config,
  }: HttpClientParams): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'GET',
      headers: {
        ...headers,
      },
      ...config,
    });

  /**
   * ### Метод для отправки DELETE-запроса
   *
   * @param params - параметры
   *
   * @returns Результат ответа от сервера
   */
  const del = <T = any, D = any>({
    version = apiVersion,
    url,
    data,
    headers,
    config,
  }: HttpClientParamsWithData<D>): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'DELETE',
      headers: {
        ...headers,
      },
      ...config,
      data,
    });

  /**
   * ### Метод для отправки HEAD-запроса
   *
   * @param {HttpClientParams} params - параметры
   *
   * @returns {AxiosPromise} Результат ответа от сервера
   */
  const head = <T = any>({
    version = apiVersion,
    url,
    headers,
    config,
  }: HttpClientParams): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'HEAD',
      headers: {
        ...headers,
      },
      ...config,
    });

  /**
   * ### Метод для отправки POST-запроса
   *
   * @param params - параметры
   *
   * @returns Результат ответа от сервера
   */
  const post = <T = any, D = any>({
    version = apiVersion,
    url,
    data,
    headers,
    config,
  }: HttpClientParamsWithData<D>): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'POST',
      headers: {
        ...headers,
      },
      ...config,
      data,
    });

  /**
   * ### Метод для отправки PUT-запроса
   *
   * @param params - параметры
   *
   * @returns Результат ответа от сервера
   */
  const put = <T = any, D = any>({
    version = apiVersion,
    url,
    data,
    headers,
    config,
  }: HttpClientParamsWithData<D>): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'PUT',
      headers: {
        ...headers,
      },
      ...config,
      data,
    });

  /**
   * ### Метод для отправки PATCH-запроса
   *
   * @param params - параметры
   *
   * @returns Результат ответа от сервера
   */
  const patch = <T = any, D = any>({
    version = apiVersion,
    url,
    data,
    headers,
    config,
  }: HttpClientParamsWithData<D>): AxiosPromise<T> =>
    axiosInstance.request<T>({
      url: constructUrl(serviceName, version, url),
      method: 'PATCH',
      headers: {
        ...headers,
      },
      ...config,
      data,
    });

  return {
    get,
    delete: del,
    head,
    post,
    put,
    patch,
  };
};
