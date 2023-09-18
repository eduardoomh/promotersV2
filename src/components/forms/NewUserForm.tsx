'use client'
import { Form, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import InputContainer from '../InputContainer'
import CustomButton from '../Button'
import { usePost } from '@/hooks/usePost'

const NewUserForm = () => {
    const [form] = useForm()
    const fetchPost = usePost()

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

    return (
        <Form form={form} onFinish={onSubmit}>
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
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <label>Repetir contraseña</label>
            <InputContainer
                type='password'
                valueContainerName='repeat_password'
                placeholder='Repetir Contraseña'
                required={true}
                style={{ padding: '0.6rem', fontSize: '1rem' }}
            />
            <CustomButton>Crear Usuario</CustomButton>
        </Form>
    )
}

export default NewUserForm