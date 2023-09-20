'use client'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import InputContainer from '../../InputContainer'
import CustomButton from '../../Button'
import { usePost } from '@/hooks/usePost'
import { FC, useEffect, useState } from 'react'
import { usePatch } from '@/hooks/usePatch'
import styles from '../users/NewUser.module.css'
import { ISettingSchema } from '@/models/Settings'
interface props {
    settings: ISettingSchema[]
}
const NewSettingForm: FC<props> = ({ settings }) => {
    const [form] = useForm()
    const fetchPost = usePost()
    const fetchPatch = usePatch()
    const [currentSetting, setCurrentSetting] = useState<any>(null)

    useEffect(() => {
            const currentSetting = settings[0].woo_keys
            if (currentSetting) {
                setCurrentSetting(currentSetting)
                form.setFieldsValue({
                    client_id: currentSetting.client_id,
                    client_secret: currentSetting.client_secret,
                    store_url: currentSetting.store_url,
                })
            }
        
    }, [])


    const onSubmit = async (data: any) => {
        await fetchPost({
            endpoint: 'settings',
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
            endpoint: `settings/1`,
            formData: {
                woo_keys:{
                    store_url: data.store_url,
                    client_id: data.client_id,
                    client_secret: data.client_secret,
                }
            },
            redirectRoute: undefined,
            reloadPage: true,
            cleanForm: false
        })
    }

    return (
        <>
            <h3 className={styles.title}>{currentSetting ? 'ACTUALIZAR AJUSTES' : 'AGREGAR AJUSTE'}</h3>
            <hr />
            <br />
            <Form form={form} onFinish={currentSetting ? onUpdate : onSubmit}>
                <label>Url de la tienda</label>
                <InputContainer
                    type='text'
                    valueContainerName='store_url'
                    placeholder='URL de la tienda'
                    required={true}
                    style={{ padding: '0.6rem', fontSize: '1rem' }}
                />
               
                <label>Customer client</label>
                <InputContainer
                    type='password'
                    valueContainerName='client_id'
                    placeholder='Customer client'
                    required={true}
                    style={{ padding: '0.6rem', fontSize: '1rem' }}
                />
                <label>Customer secret</label>
                <InputContainer
                    type='password'
                    valueContainerName='client_secret'
                    placeholder='Customer secret'
                    required={true}
                    style={{ padding: '0.6rem', fontSize: '1rem' }}
                />
                <CustomButton>{currentSetting ? 'Actualizar Ajustes' : 'Crear Ajustes'}</CustomButton>
            </Form>
        </>
    )
}

export default NewSettingForm