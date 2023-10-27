'use client'
import CustomModal from "@/components/Modal/CustomModal"
import { useSearchParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import styles from '../actionsModal.module.css'
import { Tooltip } from "antd"
import { DollarOutlined, PlusCircleOutlined } from "@ant-design/icons"

interface props {
    id: string;
}

const PromoterActions: FC<props> = ({id}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push(`/promotores/${id}`)
    }

    const handleNewCommission = () => {
        router.push(`/promotores/${id}?comision=open`);
    };

    const handleAddMovement = () => {
        router.push(`/promotores/${id}?add-amount=open`);
    };
    const handleRemoveMovement = () => {
        router.push(`/promotores/${id}?remove-amount=open`);
    };

    useEffect(() => {
        console.log(searchParams.get('actions'))
        if (searchParams.get('actions')) {
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
            >
                <div className={styles.icons_container}>
                    {
                            <section
                                className={styles.icons_item}
                                onClick={handleNewCommission}>
                                <Tooltip placement="top" title={`Crear nueva comisión`}>
                                    <PlusCircleOutlined
                                        style={{ cursor: 'pointer', fontSize: '40PX' }}
                                    />
                                </Tooltip>
                                <p>Crear Nueva comisión</p>
                            </section>
                    }
                    <section
                        className={styles.icons_item}
                        onClick={handleAddMovement}>
                        <Tooltip
                            placement="top"
                            title={`Asignar pago`}>
                            <DollarOutlined
                                style={{ fontSize: '40px', color: '#0D709A', cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <p>Asignar pago </p>
                    </section>
                    <section
                        className={styles.icons_item}
                        onClick={handleRemoveMovement}>
                        <Tooltip
                            placement="top"
                            title={`Asignar pago`}>
                            <DollarOutlined
                                style={{ fontSize: '40px', color: '#ec1912', cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <p>Descontar pago </p>
                    </section>
                </div>
                <br />
            </CustomModal>
        </>
    )
}

export default PromoterActions