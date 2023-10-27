'use client'
import FormCard from "@/components/FomCard/FormCard"
import CustomModal from "@/components/Modal/CustomModal"
import NewCommissionForm from "@/components/forms/commissions/NewCommissionForm"
import NewMovementForm from "@/components/forms/movements/NewMovementForm"
import NewPromoterForm from "@/components/forms/promoters/NewPromoterForm"
import NewUserForm from "@/components/forms/users/NewUserForm"
import { IPromoterSchema } from "@/models/Promoter"
import { IUserSchema } from "@/models/User"
import { Col, Row } from "antd"
import { useSearchParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface props {
    url: string;
    users: IUserSchema[];
    promoters: IPromoterSchema[];
    data: any;
    coupons?: any;
    type: 'users' | 'promoters' | 'promoterActions';
}

const GenericForm: FC<props> = ({ users, promoters, url, type, data, coupons = []}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push(url)
    }

    useEffect(() => {
        if (
            searchParams.get('actualizar') || 
            searchParams.get('crear') ||
            searchParams.get('comision') || 
            searchParams.get('add-amount') || 
            searchParams.get('remove-amount')
            ) {
            setIsOpenModal(true)
        } else {
            setIsOpenModal(false)
        }
    }, [searchParams])

    return (
        <>
            <CustomModal
                isModalOpen={isOpenModal}
                setIsModalOpen={closeModal}
                title={''}
                width={800}
            >
                <Row>
                    <Col span={24}>
                    <FormCard>
                        {
                            type === 'users' ? (
                                <NewUserForm users={users} />
                            ) : type === 'promoters' ? (
                                <NewPromoterForm promoters={promoters} users={users} />
                            ) :(
                                <>
                                {
                                     searchParams.get('comision') ? (
                                         <NewCommissionForm 
                                            url={`/promotores/${data._id}`} 
                                            data={data}
                                            coupons={coupons}
                                            />
                                     ) : (
                                        <>
                                        {
                                            searchParams.get('remove-amount') ? (
                                                <NewMovementForm 
                                                    url={`/promotores/${data._id}`} 
                                                    data={data}
                                                    type={'discount'}
                                                />
                                            ) : (
                                                <NewMovementForm 
                                                    url={`/promotores/${data._id}`} 
                                                    data={data}
                                                    type={'payment'}
                                                />
                                            )
                                        }
                                        </>
                                     )
                                }
                              
                                </>
                            )
                        }
                    
                </FormCard>
                    </Col>
                </Row>
               
            </CustomModal>
        </>
    )
}

export default GenericForm