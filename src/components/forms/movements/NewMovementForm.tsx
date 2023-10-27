'use client'
import { Col, Form, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import InputContainer from '../../InputContainer'
import CustomButton from '../../Button'
import { useSearchParams } from "next/navigation"
import { usePost } from '@/hooks/usePost'
import { FC, useEffect } from 'react'
import styles from '../users/NewUser.module.css'

interface props {
    url: string;
    data: any;
    type: 'payment' | 'discount';
}
const NewMovementForm: FC<props> = ({ url, data: allData, type }) => {
    const [form] = useForm()
    const fetchPost = usePost()
    const searchParams = useSearchParams()

    useEffect(() => {
            form.resetFields()
    }, [searchParams])

    const onSubmit = async (data: any) => {
        await fetchPost({
            endpoint: 'movements',
            formData: {
                new_commission: {
                    user: allData.user._id,
                    promoter: allData._id,
                    description: data.description,
                    amount: data.amount,
                    type
                }
            },
            redirectRoute: url,
            reloadPage: true,
            cleanForm: form.resetFields
        })
    }

    return (
        <>
            <h3 className={styles.title}>{`${type === 'discount' ? 'DESCONTAR' : 'DEPOSITAR'} SALDO`}</h3>
            <hr />
            <br />
            <Form form={form} onFinish={onSubmit}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={24} xl={24}>
                        <label>Cantidad</label>
                        <InputContainer
                            type='number'
                            valueContainerName='amount'
                            placeholder='Cantidad'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                    <Col xs={24} lg={24} xl={24}>
                        <label>Descripción</label>
                        <InputContainer
                            type='text'
                            valueContainerName='description'
                            placeholder='Concepto'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                </Row>
                <CustomButton>{`${type === 'discount' ? 'Descontar' : 'Depositar'} Saldo`}</CustomButton>
            </Form>
        </>
    )
}

export default NewMovementForm