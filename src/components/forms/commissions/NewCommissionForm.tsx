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
}
const NewCommissionForm: FC<props> = ({ url, data: allData }) => {
    const [form] = useForm()
    const fetchPost = usePost()
    const searchParams = useSearchParams()

    useEffect(() => {
            form.resetFields()
    }, [searchParams])

    const onSubmit = async (data: any) => {
        await fetchPost({
            endpoint: 'commissions',
            formData: {
                new_commission: {
                    user: allData.user._id,
                    promoter: allData._id,
                    coupon:{
                        id: '7164',
                        code: 'victor1',
                        products: ['4050']
                    },
                    earnings: {
                        type: data.type,
                        amount: data.amount
                    }
                }
            },
            redirectRoute: url,
            reloadPage: true,
            cleanForm: form.resetFields
        })
    }

    return (
        <>
            <h3 className={styles.title}>{'ASIGNAR COMISIÓN'}</h3>
            <hr />
            <br />
            <Form form={form} onFinish={onSubmit}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={24} xl={24}>
                        <label>Tipo</label>
                        <InputContainer
                            type='select'
                            valueContainerName='type'
                            placeholder='Tipo de descuento'
                            style={{ fontSize: '1rem' }}
                            required={true}
                            optionsList={[
                                {
                                    value: 'percentage',
                                    label: 'Porcentaje'
                                },
                                {
                                    value: 'fixed_price',
                                    label: 'Precio fijo'
                                }
                            ]}
                        />
                    </Col>
                    <Col xs={24} lg={24} xl={24}>
                        <label>Ganancia</label>
                        <InputContainer
                            type='number'
                            valueContainerName='amount'
                            placeholder='Ganancia'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                </Row>
                <CustomButton>{'Asignar Nueva comisión'}</CustomButton>
            </Form>
        </>
    )
}

export default NewCommissionForm