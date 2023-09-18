'use client'
import { Modal } from "antd"
import { FC, PropsWithChildren, Suspense } from "react"

interface props{
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    title: string;
}

const CustomModal:FC<PropsWithChildren<props>> = ({isModalOpen, setIsModalOpen, title, children}) =>{
    return(
        <Suspense>
        <Modal
                title={title}
                centered
                open={isModalOpen}
                footer={null}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                <br/>
               {children}
            </Modal></Suspense>
    )
}

export default CustomModal