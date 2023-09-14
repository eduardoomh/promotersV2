import axios, { AxiosRequestConfig } from 'axios'

interface AuthFetchProps {
  endpoint: string
  redirectRoute?: string
  formData: any
  options?: AxiosRequestConfig<any>
}

export function useAuthFetch () {
  const authRouter = async ({
    endpoint,
    formData,
    options
  }: AuthFetchProps) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/auth/${endpoint}`,
        formData,
        options
      )
      console.log(response)
        return response

    } catch (error: any) {
      console.log(error)
        return error.response
    }
  }

  return authRouter
}