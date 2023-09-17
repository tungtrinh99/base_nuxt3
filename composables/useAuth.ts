import { mutationSignIn } from "~/graphql/mutation"
import { SignInInput } from "~/types/user"
import { setToken, setTokenExpires, removeToken } from "~/composables/useUtils"

export const useAuth = () => {
  const signIn = async (request: SignInInput, saveLogin?: boolean) => {
    const { mutate } = useMutation(mutationSignIn, {
      variables: { input: request },
    })
    try {
      const { data } = await mutate()
      if (data) {
        const token = data?.signIn?.accessToken
        saveLogin ? setTokenExpires(token) : setToken(token)
        return data
      }
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  const logout = () => {
    setAdmin(null)
    removeToken()
  }

  return { signIn, logout }
}
