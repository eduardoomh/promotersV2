'use client'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import InputContainer from '../InputContainer'
import CustomButton from '../Button'
import { useSearchParams, useRouter } from "next/navigation"
import { usePost } from '@/hooks/usePost'
import { FC, useEffect, useState } from 'react'
import { IUserSchema } from '@/models/User'
import { usePatch } from '@/hooks/usePatch'

interface props {
    users: IUserSchema[]
}
const NewUserForm: FC<props> = ({ users }) => {
    const [form] = useForm()
    const fetchPost = usePost()
    const fetchPatch = usePatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentUser, setCurrentUser] = useState<IUserSchema | null>(null)

    const finishEditMode = () => {
        router.push('/usuarios')
    }

    useEffect(() => {
        if (searchParams.get('actualizar')) {
            const currentUser = users.find(el => el._id.toString() === searchParams.get('actualizar'))
            if (currentUser) {
                setCurrentUser(currentUser)
                form.setFieldsValue({
                    name: currentUser.name,
                    email: currentUser.email,
                    role: currentUser.role,
                    password: 'norealpassword',
                    repeat_password: 'norealpassword'
                    
                })
            }
            console.log(currentUser)
        } else {
            setCurrentUser(null)
            form.resetFields()
        }
    }, [searchParams])


    const onSubmit = async (data: any) => {
        await fetchPost({
            endpoint: 'auth/register',
            formData: {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                confirm_password: data.repeat_password
            },
            redirectRoute: undefined,
            reloadPage: true,
            cleanForm: form.resetFields
        })
    }

    const onUpdate = async (data: any) => {
        await fetchPatch({
            endpoint: `users?id=${searchParams.get('actualizar')}`,
            formData: {
                name: data.name,
                email: data.email,
            },
            redirectRoute: undefined,
            reloadPage: true,
            cleanForm: form.resetFields
        })
        finishEditMode()

    }

    return (
        <Form form={form} onFinish={currentUser ? onUpdate : onSubmit}>
            <label>Nombre</label>
            <InputContainer
                type='text'
                valueContainerName='name'
                placeholder='Nombre'
                required={true}
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <label>Correo</label>
            <InputContainer
                type='email'
                valueContainerName='email'
                placeholder='Correo'
                required={true}
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <label>Tipo de usuario</label>
            <InputContainer
                type='select'
                valueContainerName='role'
                placeholder='Tipo de usuario'
                style={{ fontSize: '1rem' }}
                required={true}
                disabled={currentUser ? true : false}
                optionsList={[
                    {
                        value: 'promoter',
                        label: 'Promotor'
                    },
                    {
                        value: 'admin',
                        label: 'Administrador'
                    }
                ]}
            />
            <label>Contraseña</label>
            <InputContainer
                type='password'
                valueContainerName='password'
                placeholder='Contraseña'
                required={true}
                disabled={currentUser ? true : false}
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <label>Repetir contraseña</label>
            <InputContainer
                type='password'
                valueContainerName='repeat_password'
                placeholder='Repetir Contraseña'
                required={true}
                disabled={currentUser ? true : false}
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <CustomButton>{currentUser ? 'Actualizar Usuario' : 'Crear Usuario'}</CustomButton>
        </Form>
    )
}

export default NewUserForm