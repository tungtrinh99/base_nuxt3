import { useCookie, useRuntimeConfig, type UseFetchOptions } from 'nuxt/app'

export function useApi<T>(key: string, url: string, options: UseFetchOptions<T> = {}) {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()
  const headers = {
    'Content-Type': 'application/json'
  }

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,
    // cache request
    key: key,

    // set user token if connected
    headers: userAuth.value
      ? { ...headers, ...{ Authorization: `Bearer ${userAuth.value}` } }
      : { ...headers },

    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(url, params)
}

export function useHttpGet<T>(key: string, url: string, options: UseFetchOptions<T> = {}) {
  const params = { ...options, method: 'GET' }
  return useApi(key, url, params)
}

export function useHttpPost<T>(key: string, url: string, options: UseFetchOptions<T> = {}) {
  const params = { ...options, method: 'POST' }
  return useApi(key, url, params)
}

export function useHttpPut<T>(key: string, url: string, options: UseFetchOptions<T> = {}) {
  const params = { ...options, method: 'PUT' }
  return useApi(key, url, params)
}

export function useHttpDelete<T>(key: string, url: string, options: UseFetchOptions<T> = {}) {
  const params = { ...options, method: 'DELETE' }
  return useApi(key, url, params)
}
