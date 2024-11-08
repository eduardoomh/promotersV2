'use client'
import { Form, notification, Spin } from "antd"
import { useRouter } from 'next/navigation'
import CustomButton from "../Button"
import InputContainer from "../InputContainer"
import styles from './LoginForm.module.css'
import { useForm } from "antd/es/form/Form"
import axios from "axios"
import { useContext, useState } from "react"
import CustomModal from "../Modal/CustomModal"
import { GlobalContext } from "@/context/globalContext"

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForgot, setIsLoadingForgot] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { updateUserData, startLoading, endLoading } = useContext(GlobalContext)
    const [form] = useForm()
    const router = useRouter()

    const onSubmit = async () => {
        try {
            startLoading()
            const email = form.getFieldValue('email')
            const password = form.getFieldValue('password')
            setIsLoading(true)
            const result = await axios.post(`/api/auth/login`, {
                email,
                password
            })
            if (result.status !== 200) {
                notification.error({
                    message: 'Usuario o contraseña incorrectos, intenta de nuevo.'
                })
                setIsLoading(false)
                endLoading()
            }
            notification.success({
                message: result.data.messages
            })

            updateUserData(result.data.userLogged)
            if (result.data.userLogged.role === 'promoter') {
                router.push(`/perfil/${result.data.userLogged.id}`)
            } else {
                router.push('/')
            }

            setIsLoading(false)
        } catch (error: any) {
            console.log(error)
            notification.error({
                message: error.response.data.message
            })
            setIsLoading(false)
            endLoading()
            console.log(error)
        }
    }

    const forgotPassword = async () => {
        try {
            const email = form.getFieldValue('forgot_email')
            setIsLoadingForgot(true)
            const result = await axios.post(`/api/auth/forget-password`, {
                email,
            })
            notification.success({
                message: result.data.message
            })
            setIsLoadingForgot(false)
            setIsModalOpen(false)
            form.resetFields()

        } catch (error: any) {
            console.log(error)
            setIsLoadingForgot(false)
            notification.error({
                message: error.response.data.message
            })
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
                        <h2>INICIA SESIÓN</h2>
                    </div>
                    <br />
                    <h3 className={styles.label}>Usuario</h3>
                    <Form form={form} onFinish={onSubmit}>
                        <InputContainer
                            type='text'
                            placeholder='introduce tu usuario'
                            valueContainerName='email'
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                        <h3 className={styles.label}>Contraseña</h3>
                        <InputContainer
                            type='password'
                            placeholder='introduce tu contraseña'
                            valueContainerName='password'
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                        <CustomButton>Ingresar</CustomButton>
                    </Form>

                    <p
                        onClick={() => setIsModalOpen(true)}
                        className={`flex justify-center ${styles.forgot_password}`}
                    >
                        Olvidaste tu contraseña?
                    </p>
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
            <CustomModal
                title={'CAMBIO DE CONTRASEÑA'}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}>
                <article>
                    <Form form={form} onFinish={forgotPassword}>
                        <Spin spinning={isLoadingForgot}>
                            <p>Escribe el correo electrónico ligado a tu cuenta y se te enviará un correo con un enlace para cambiar la contraseña.</p>
                            <InputContainer
                                type='email'
                                placeholder='introduce tu correo electrónico'
                                valueContainerName='forgot_email'
                                style={{ padding: '0.6rem', fontSize: '1rem' }}
                            />
                            <CustomButton>Enviar correo</CustomButton>
                        </Spin>
                    </Form>
                </article>
            </CustomModal>
        </div>
    )
}

export default LoginForm