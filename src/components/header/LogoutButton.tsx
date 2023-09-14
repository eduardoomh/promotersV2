'use client'
import { LogoutOutlined } from "@ant-design/icons"
import { useRouter } from 'next/navigation'
import styles from './LogoutButton.module.css'
import { Tooltip, notification } from "antd"
import axios from "axios"

const LogoutButton = () => {
    const router = useRouter()

    const logout = async () =>{
        try{
            const response = await axios.post(`${process.env.API_URL}/api/auth/logout`,{
                email: 'juan@juan4.com'
            })
            if(response.status === 200){
                notification.success({
                    message: response.data.message
                })
            }
            router.push('/login')
        }catch(error){
            console.log(error)
            notification.error({
                message: 'Un error ha ocurrido'
            })
        }
    }

    return (
        <>
            <Tooltip placement="bottom" title={'Cerrar sesión'}>
                <div 
                onClick={logout}
                    className={`flex justify-center items-center bg-chamosa-red ${styles.logout}`}
                    >
                    <LogoutOutlined />
                </div>
            </Tooltip>

        </>

    )
}

export default LogoutButton