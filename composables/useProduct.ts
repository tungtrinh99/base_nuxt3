
import { useGetProductsApi } from "@/apis/product"
export const useProducts = () => {
  const useGetProducts = async (params?: {
    page?: number,
    limit?: number,
    search?: string,
  }) => {
    try {
      const { data } = await useGetProductsApi(params)
      return data
    }
    catch (e) {
      throw e
    }
  }
  return {
    useGetProducts
  }
}
