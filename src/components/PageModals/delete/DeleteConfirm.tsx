'use client'
import CustomButton from "@/components/Button"
import CustomModal from "@/components/Modal/CustomModal"
import { useSearchParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import styles from './DeleteConfirm.module.css'
import { useDelete } from "@/hooks/useDelete"

interface props {
    type: 'users' | 'promoters' | 'commissions';
    url: string;
}

const DeleteConfirm: FC<props> = ({ type, url }) => {
    const router = useRouter()
    const fetchDelete = useDelete()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push(url)
    }

    const assignName = () => {
        switch (type) {
            case 'users':
                return 'usuario'
            case 'promoters':
                return 'promotor'
            case 'commissions':
                return 'comisión'
            default:
                return 'usuario'
        }
    }

    useEffect(() => {
        if (searchParams.get('eliminar') && searchParams.get('correo')) {
            setIsOpenModal(true)
        } else {
            setIsOpenModal(false)
        }
    }, [searchParams])

    const onSubmit = () => {
        switch (type) {
            case 'users':
                fetchDelete({
                    endpoint: `users/${searchParams.get('eliminar')}`,
                    redirectRoute: undefined,
                    reloadPage: true
                })
                break;
            case 'promoters':
                fetchDelete({
                    endpoint: `promoters/${searchParams.get('eliminar')}`,
                    redirectRoute: undefined,
                    reloadPage: true
                })
                break;
            case 'commissions':
                fetchDelete({
                    endpoint: `commissions/${searchParams.get('eliminar')}`,
                    redirectRoute: undefined,
                    reloadPage: true
                })
                break;
            default:
                break;
        }
        closeModal()
    }
    return (
        <>
            <CustomModal
                isModalOpen={isOpenModal}
                setIsModalOpen={closeModal}
                title={`Eliminar el ${assignName()}`}
            >
                <p>Esta seguro que desea eliminar al {assignName()} <strong>{searchParams.get('correo')}</strong>? toda la imformación se perderá para siempre.</p>
                <br />
                <div className={styles.buttons_container}>
                    <CustomButton onClick={onSubmit}>Eliminar</CustomButton>
                </div>

            </CustomModal>
        </>
    )
}

export default DeleteConfirm