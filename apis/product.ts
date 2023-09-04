export const useGetProductsApi = (params?: {
  page?: number,
  limit?: number,
  search?: string,
}) => {
  return useHttpGet('products', '/products', params)
}
