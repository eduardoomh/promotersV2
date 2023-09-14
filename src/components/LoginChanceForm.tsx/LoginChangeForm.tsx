'use client'
import { Form, notification, Spin } from "antd"
import { useRouter } from 'next/navigation'
import CustomButton from "../Button"
import InputContainer from "../InputContainer"
import styles from './LoginChangeForm.module.css'
import { useForm } from "antd/es/form/Form"
import { AxiosRequestConfig } from "axios"
import { useSearchParams } from 'next/navigation'
import { useState } from "react"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import Link from "next/link"

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = useForm()
    const router = useRouter()
    const searchParams = useSearchParams()
    const authFetch = useAuthFetch()

    const onSubmit = async () => {
        try {
            const token = searchParams.get('token')
            const newPassword = form.getFieldValue('newPassword')
            const confirmPassword = form.getFieldValue('confirmPassword')
            setIsLoading(true)

            const options: AxiosRequestConfig<any> = {
                headers: {
                    token
                }
            }

            const result = await authFetch({
                endpoint: 'change-password',
                formData: {
                    newPassword,
                    confirmPassword
                },
                options
            })

            if (result.status !== 200) {
                notification.error({
                    message: 'La contraseña no pudo actualizarse.'
                })
                setIsLoading(false)
                return
            }
            notification.success({
                message: result.data.message
            })
            router.push('/login')
            setIsLoading(false)
        } catch (error: any) {
            console.log(error)
            notification.error({
                message: error.response.data.message
            })
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            <div className={`${styles.container}`}>
                <div className={styles.logo}>
                    <img src="/logo-Chamosa.png" alt="Mi Imagen" width={120} />
                </div>
                <div className={`flex justify-center ${styles.title_form}`}>
                    <h2>SISTEMA DE PROMOTORES</h2>
                </div>
                <Spin spinning={isLoading}>
                    <div className={`flex justify-center ${styles.title_container}`}>
                        <h2>ASIGNAR NUEVA CONTRASEÑA</h2>
                    </div>
                    <br />
                    <h3 className={styles.label}>Contraseña</h3>
                    <Form form={form} onFinish={onSubmit}>

                        <InputContainer
                            type='password'
                            placeholder='introduce una contraseña'
                            valueContainerName='newPassword'
                            style={{ padding: '0.6rem' }}
                        />
                        <h3 className={styles.label}>Repetir Contraseña</h3>
                        <InputContainer
                            type='password'
                            placeholder='repite la conmtraseña'
                            valueContainerName='confirmPassword'
                            style={{ padding: '0.6rem' }}
                        />
                        <CustomButton>Reasignar contraseña</CustomButton>
                        <p className={`flex justify-center ${styles.forgot_password}`}
                        >
                            <Link href='/login'>Iniciar sesión</Link>
                        </p>
                    </Form>
                </Spin>
                <div className={styles.footer}>
                    <div className={styles.footer_item_1}>
                        <p>PROBLEMAS?</p>
                        <p>CONTACTANOS:</p>
                    </div>
                    <div className={`bg-chamosa-red ${styles.footer_item_2}`}>
                        <p>SHOP@CHAMARRA.COM</p>
                        <p>8183449974 - 8183427194</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm