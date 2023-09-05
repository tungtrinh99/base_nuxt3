import { useHttpDelete, useHttpGet, useHttpPost, useHttpPut } from "~/composables/useApi"

export const useGetProductsApi = (query: any = {}) => {
    return useHttpGet('products', '/products', {
        query: { ...query }
    })
}

export const useGetProductDetailApi = (id: number) => {
    return useHttpGet('products', `/products/${id}` )
}

export const useCreateProductApi = (body: any) => {
    return useHttpPost('products', '/products/add', {
        body
    })
}

export const useUpdateProductApi = (id: number, body: any) => {
  return useHttpPut('products', `/products/${id}`, {
      body
  })
}

export const useDeleteProductApi = (id: number) => {
  return useHttpDelete('products', `/products/${id}`)
}