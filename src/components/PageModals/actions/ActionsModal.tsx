'use client'
import CustomModal from "@/components/Modal/CustomModal"
import { useSearchParams, useRouter } from "next/navigation"
import { FC, useContext, useEffect, useState } from "react"
import styles from './actionsModal.module.css'
import { Tooltip } from "antd"
import { DeleteOutlined, EditOutlined, RightCircleOutlined } from "@ant-design/icons"
import { GlobalContext } from "@/context/globalContext"

interface props {
    type: 'users' | 'promoters',
    url: string;
}

const ActionsModal: FC<props> = ({ type, url }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { startLoading } = useContext(GlobalContext)

    const closeModal = () => {
        router.push(url)
    }

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`${url}?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`${url}?actualizar=${_id}`);
    };

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`${url}/${_id}`);
    };

    useEffect(() => {
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
                        <Tooltip placement="top" title={`Actualizar ${type === 'users' ? 'usuario' : 'promotor'}`}>
                            <EditOutlined
                                style={{ cursor: 'pointer', fontSize: '40PX' }}
                            />
                        </Tooltip>
                        <p>Editar {type === 'users' ? 'usuario' : 'promotor'}</p>
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
                        <p>Eliminar {type === 'users' ? 'usuario' : 'promotor'}</p>
                    </section>

                    <section
                        className={styles.icons_item}
                        onClick={() => handleDetailClick(searchParams.get('action') || '')}>
                        <Tooltip 
                            placement="top" 
                            title={`Actualizar ${type === 'users' ? 'usuario' : 'promotor'}`}>
                            <RightCircleOutlined
                                style={{ fontSize: '40px', color: '#0D709A', cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <p>Detalle del {type === 'users' ? 'usuario' : 'promotor'}</p>
                    </section>
                </div>
                <br />
            </CustomModal>
        </>
    )
}

export default ActionsModal