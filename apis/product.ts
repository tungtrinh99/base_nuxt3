import { useHttpGet, useHttpPost } from "~/composables/useApi"

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
