'use client'
import CustomButton from "@/components/Button"
import FormCard from "@/components/FomCard/FormCard"
import CustomModal from "@/components/Modal/CustomModal"
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
    promoters: IPromoterSchema[]
    type: 'users' | 'promoters';
}

const GenericForm: FC<props> = ({ users, promoters, url, type}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push(url)
    }

    useEffect(() => {
        console.log(searchParams.get('actualizar'))
        if (searchParams.get('actualizar') || searchParams.get('crear')) {
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
                            ) : (
                                <NewPromoterForm promoters={promoters} users={users} />
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