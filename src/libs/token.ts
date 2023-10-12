import { cookies } from "next/headers"

export const getToken = () =>{
    const cookieStore = cookies()
    const auth_cookie = cookieStore.get('auth_cookie')

    return auth_cookie
}