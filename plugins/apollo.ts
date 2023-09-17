/* eslint-disable prettier/prettier */
import { createHttpLink, from, ApolloLink } from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { provideApolloClient } from "@vue/apollo-composable"
import { createUploadLink } from "apollo-upload-client"
import { getToken } from "~/composables/useUtils"
import { useAuth } from "~/composables/useAuth"
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app"

export default defineNuxtPlugin((nuxtApp: any) => {
  const { logout } = useAuth()
  const env = useRuntimeConfig() as any
  const { $apollo } = nuxtApp

  // trigger the error hook on an error
  const errorLink = onError((err: any) => {
    // do something (redirect to login)

    if (err?.graphQLErrors) {
      err?.graphQLErrors.forEach((element: any) => {
        if (element && element.message) {
          if (element.message == "no auth") {
            console.log("no auth")
            logout()
            location.reload()
          }
        }
      })
    }

    if (err?.networkError?.result?.errors) {
      err?.networkError?.result?.errors?.forEach((element: any) => {
        if (element && element.message) {
          if (err?.networkError?.result?.errors[0].message === "xxx") logout()
          else console.log(err?.networkError?.result?.errors[0].message)
        }
      })
    }
  })

  // create an authLink and set authentication token if necessary
  const authLink = setContext(async (_, { headers }) => {
    const token = getToken()
    const _headers = {
      ...headers,
    }
    if (token) {
      _headers[env.public.NUXT_TOKEN_KEY] = `${token}`
    }
    return {
      headers: {
        ..._headers,
      },
    }
  })

  // Default httpLink (main communication for apollo)
  const httpLink = createUploadLink({
    uri: env.public.NUXT_API_URL,
  })

  $apollo.defaultClient.setLink(from([errorLink, authLink, httpLink]))
  $apollo.defaultClient.httpEndpoint = env.public.NUXT_API_URL

  provideApolloClient($apollo.defaultClient)
})
