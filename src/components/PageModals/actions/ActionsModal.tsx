'use client'
import CustomButton from "@/components/Button"
import CustomModal from "@/components/Modal/CustomModal"
import { useSearchParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import styles from './actionsModal.module.css'
import { useDelete } from "@/hooks/useDelete"
import { Tooltip } from "antd"
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, RightCircleOutlined } from "@ant-design/icons"
import { GlobalContext } from "@/context/globalContext"

const ActionsModal = () => {
    const router = useRouter()
    const fetchDelete = useDelete()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { startLoading } = useContext(GlobalContext)

    const closeModal = () => {
        router.push('/usuarios')
    }

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/usuarios?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`/usuarios?actualizar=${_id}`);
    };

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/usuarios/${_id}`);
    };

    useEffect(() => {
        console.log(searchParams.get('action'))
        if (searchParams.get('action') && searchParams.get('correo')) {
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
                    <section 
                        className={styles.icons_item} 
                        onClick={() => handleUpdateClick(searchParams.get('action') || '')}>
                        <Tooltip placement="top" title={'Actualizar usuario'}>
                            <EditOutlined
                                style={{ cursor: 'pointer', fontSize: '40PX' }}
                            />
                        </Tooltip>
                        <p>Editar usuario</p>
                    </section>

                    <section 
                        className={styles.icons_item}
                        onClick={() => 
                            handleDeleteClick(searchParams.get('action') || '',
                            searchParams.get('correo') || '')}>
                        <Tooltip placement="top" title={'Actualizar usuario'}>
                            <DeleteOutlined
                                //@ts-ignore

                                style={{ color: '#ec1912', cursor: 'pointer', fontSize: '40PX' }}
                            />
                        </Tooltip>
                        <p>Eliminar usuario</p>
                    </section>

                    <section 
                        className={styles.icons_item}
                        onClick={() => handleDetailClick(searchParams.get('action') || '')}>
                        <Tooltip placement="top" title={'Actualizar usuario'}>
                            <RightCircleOutlined
                                style={{ fontSize: '40px', color: '#0D709A', cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <p>Detalle del usuario</p>
                    </section>
                </div>
                <br />
            </CustomModal>
        </>
    )
}

export default ActionsModal