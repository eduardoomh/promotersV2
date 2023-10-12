'use client'
import CustomButton from "@/components/Button"
import FormCard from "@/components/FomCard/FormCard"
import CustomModal from "@/components/Modal/CustomModal"
import NewUserForm from "@/components/forms/users/NewUserForm"
import { IUserSchema } from "@/models/User"
import { Col, Row } from "antd"
import { useSearchParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface props {
    users: IUserSchema[]
}

const GenericForm: FC<props> = ({ users }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push('/usuarios')
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
                    <NewUserForm users={users} />
                </FormCard>
                    </Col>
                </Row>
               
            </CustomModal>
        </>
    )
}

export default GenericForm