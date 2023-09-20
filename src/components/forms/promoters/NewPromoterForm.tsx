'use client'
import { Col, Form, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import InputContainer from '../../InputContainer'
import CustomButton from '../../Button'
import { useSearchParams, useRouter } from "next/navigation"
import { usePost } from '@/hooks/usePost'
import { FC, useEffect, useState } from 'react'
import { IUserSchema } from '@/models/User'
import { usePatch } from '@/hooks/usePatch'
import styles from '../users/NewUser.module.css'
import { IPromoterSchema } from '@/models/Promoter'

interface props {
    promoters: IPromoterSchema[];
    users: IUserSchema[];
}
const NewPromoterForm: FC<props> = ({ promoters, users }) => {
    const [form] = useForm()
    const fetchPost = usePost()
    const fetchPatch = usePatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentPromoter, setCurrentPromoter] = useState<IPromoterSchema | null>(null)

    const finishEditMode = () => {
        router.push('/promotores')
    }

    useEffect(() => {
        if (searchParams.get('actualizar')) {
            const currentPromoter = promoters.find(el => el._id.toString() === searchParams.get('actualizar'))
            if (currentPromoter) {
                setCurrentPromoter(currentPromoter)
                form.setFieldsValue({
                    //@ts-ignore
                    user: currentPromoter.user._id,
                    phone: currentPromoter.personal_info.phone,
                    mobile_phone: currentPromoter.personal_info.mobile_phone,
                    rfc: currentPromoter.personal_info.rfc,
                    street: currentPromoter.address.street,
                    postal_code: currentPromoter.address.postal_code,
                    district: currentPromoter.address.district,
                    state: currentPromoter.address.state,
                    country: currentPromoter.address.country,
                })
            }
            console.log(currentPromoter)
        } else {
            setCurrentPromoter(null)
            form.resetFields()
        }
    }, [searchParams])


    const onSubmit = async (data: any) => {
        await fetchPost({
            endpoint: 'promoters',
            formData: {
                new_promoter: {
                    user: data.user,
                    personal_info: {
                        phone: data.phone,
                        mobile_phone: data.mobile_phone,
                        rfc: data.rfc
                    },
                    address: {
                        street: data.street,
                        postal_code: data.postal_code,
                        district: data.district,
                        state: data.state,
                        country: data.country
                    },
                }
            },
            redirectRoute: undefined,
            reloadPage: true,
            cleanForm: form.resetFields
        })
    }

    const onUpdate = async (data: any) => {
        await fetchPatch({
            endpoint: `promoters/${searchParams.get('actualizar')}`,
            formData: {
                update_promoter: {
                    personal_info: {
                        phone: data.phone,
                        mobile_phone: data.mobile_phone,
                        rfc: data.rfc
                    },
                    address: {
                        street: data.street,
                        postal_code: data.postal_code,
                        district: data.district,
                        state: data.state,
                        country: data.country
                    },
                }
            },
            redirectRoute: undefined,
            reloadPage: true,
            cleanForm: form.resetFields
        })
        finishEditMode()

    }

    return (
        <>
            <h3 id='nuevo-promotor' className={styles.title}>{currentPromoter ? 'ACTUALIZAR PROMOTOR' : 'ASIGNAR PROMOTOR'}</h3>
            <hr />
            <br />
            <Form form={form} onFinish={currentPromoter ? onUpdate : onSubmit}>
                <label>Usuario</label>
                <InputContainer
                    type='select'
                    valueContainerName='user'
                    placeholder='Usuario'
                    style={{ fontSize: '1rem' }}
                    required={true}
                    disabled={currentPromoter ? true : false}
                    optionsList={users.map((el: IUserSchema) => {
                        return{
                            label: el.email,
                            value: el._id
                        }
                    })}
                />
                <Row gutter={[20, 20]}>
                    <Col xs={24} md={24} lg={24} xl={12}>
                        <label>Teléfono de casa</label>
                        <InputContainer
                            type='text'
                            valueContainerName='phone'
                            placeholder='Número de casa'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                    <Col xs={24} lg={24} xl={12}>
                        <label>Teéfono celular</label>
                        <InputContainer
                            type='text'
                            valueContainerName='mobile_phone'
                            placeholder='Número celular'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={24} xl={12}>
                        <label>RFC</label>
                        <InputContainer
                            type='text'
                            valueContainerName='rfc'
                            placeholder='RFC'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                    <Col xs={24} lg={24} xl={12}>
                        <label>Código postal</label>
                        <InputContainer
                            type='text'
                            valueContainerName='postal_code'
                            placeholder='Código postal'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                </Row>

                <label>Calle</label>
                <InputContainer
                    type='text'
                    valueContainerName='street'
                    placeholder='Calle'
                    required={true}
                    style={{ padding: '0.6rem', fontSize: '1rem' }}
                />
                <label>Colonia</label>
                <InputContainer
                    type='text'
                    valueContainerName='district'
                    placeholder='Colonia/fraccionamiento'
                    required={true}
                    style={{ padding: '0.6rem', fontSize: '1rem' }}
                />
                <Row gutter={[20, 20]}>
                    <Col xs={24} md={24} lg={24} xl={12}>
                        <label>Estado</label>
                        <InputContainer
                            type='text'
                            valueContainerName='state'
                            placeholder='Estado'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                    <Col xs={24} lg={24} xl={12}>
                        <label>País</label>
                        <InputContainer
                            type='text'
                            valueContainerName='country'
                            placeholder='País'
                            required={true}
                            style={{ padding: '0.6rem', fontSize: '1rem' }}
                        />
                    </Col>
                </Row>
                <CustomButton>{currentPromoter ? 'Actualizar Promotor' : 'Asignar Promtor'}</CustomButton>
                {
                    currentPromoter && (
                        <section className="mt-4">
                            <p className='flex justify-center text-base' onClick={finishEditMode}>
                                <a>Cancelar</a>
                            </p>
                        </section>

                    )
                }
            </Form>
        </>
    )
}

export default NewPromoterForm