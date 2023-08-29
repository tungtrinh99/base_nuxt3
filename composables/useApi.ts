import { useCookie, useRuntimeConfig, type UseFetchOptions } from 'nuxt/app'
// import { defu } from 'defu'

export function useApi<T> (url: string, options: UseFetchOptions<T> = {}) {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL ?? 'https://api.nuxtjs.dev',
    // cache request
    key: url,

    // set user token if connected
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},

    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError (_ctx) {
      // throw new myBusinessError()
    }
  }

  // for nice deep defaults, please use unjs/defu
  // const params = defu(options, defaults)
  const params = { ...defaults, ...options}

  return useFetch(url, params)
}
