import { useGetProductsApi, useGetProductDetailApi, useCreateProductApi } from "~/apis/product"

export const useProduct = () => {
    const getListProduct = async (input: {
        limit: number,
        skip: number
    }) => {
        try {
            const { data } = await useGetProductsApi(input)
            if (data) {
                return data
            }
        } catch (e) {
            throw e
        }
    }

    const getProductDetail = async (id: number) => {
        try {
            const { data } = await useGetProductDetailApi(id)
            if (data) {
                return data
            }
        } catch (e) {
            throw e
        }
    }

    const postProducts = async (body: any) => {
        try {
            const { data } = await useCreateProductApi(body)
            if (data) {
                return data
            }
        } catch (e) {
            throw e
        }
    }
    return {
        getListProduct,
        getProductDetail,
        postProducts
    }

}
