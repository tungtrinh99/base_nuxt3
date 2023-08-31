import {useLoginApi} from "~/apis/user"
import {useAuthStore} from "~/stores/auth"
import {ElMessage} from "element-plus"

export const useAuth = () => {
  const useLogin = async (body: any) => {
    try {
      const {data} = await useLoginApi(body)
      return data
    }
    catch (e) {
      throw e
      console.log(e)
    }
  }

  const useLogout = async () => {
    try {
      const token = useCookie("token")
      token.value = null
      useAuthStore().resetState()
      ElMessage.success("Logout success")
    }
    catch (e) {
      throw e
    }
  }

  return {
    useLogin,
    useLogout
  }
}
