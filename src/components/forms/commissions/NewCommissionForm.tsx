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
    coupons: any[];
}
const NewCommissionForm: FC<props> = ({ url, data: allData, coupons = [] }) => {
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
                    user: allData.user.id,
                    promoter: allData.id,
                    coupon: {
                        id: coupons.find(el => el.id === data.coupon)?.id as string,
                        code: coupons.find(el => el.id === data.coupon)?.code as string,
                        products: coupons.find(el => el.id === data.coupon)?.product_ids as string[]
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
                        <label>Cupón asignado</label>
                        <InputContainer
                            type='searchSelect'
                            valueContainerName='coupon'
                            placeholder='Selecciona un cupón'
                            style={{ fontSize: '1rem' }}
                            canSearch
                            required={true}
                            filter={(input: any, option: any) => (option?.label.toLowerCase() ?? '').includes(input)}
                            optionsList={coupons?.map((el: any) => {
                                return {
                                    label: `${el.code} - ${el.discount_type === 'percent' ? `${el.amount}%` : `${el.amount} mxn`}`,
                                    value: el.id
                                }
                            }  ) || []}
                        />
                    </Col>
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