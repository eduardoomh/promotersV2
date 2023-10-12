'use client'
import CustomButton from "@/components/Button"
import CustomModal from "@/components/Modal/CustomModal"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from './DeleteConfirm.module.css'
import { useDelete } from "@/hooks/useDelete"

const DeleteConfirm = () => {
    const router = useRouter()
    const fetchDelete = useDelete()
    const searchParams = useSearchParams()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closeModal = () => {
        router.push('/usuarios')
    }

    useEffect(() => {
        if (searchParams.get('eliminar') && searchParams.get('correo')) {
            setIsOpenModal(true)
        } else {
            setIsOpenModal(false)
        }
    }, [searchParams])

    const onSubmit = () =>{
        fetchDelete({
            endpoint: `users/${searchParams.get('eliminar')}`,
            redirectRoute: undefined,
            reloadPage: true
        })
        closeModal()
    }
    return (
        <>
            <CustomModal
                isModalOpen={isOpenModal}
                setIsModalOpen={closeModal}
                title={'Eliminar el usuario'}
            >
                <p>Esta seguro que desea eliminar al usuario <strong>{searchParams.get('correo')}</strong>? toda la imformación se perderá para siempre.</p>
                <br />
                <div className={styles.buttons_container}>
                    <CustomButton onClick={onSubmit}>Eliminar</CustomButton>
                </div>

            </CustomModal>
        </>
    )
}

export default DeleteConfirm