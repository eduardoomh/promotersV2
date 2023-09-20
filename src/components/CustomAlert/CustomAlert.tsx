'use client'
import { Alert } from "antd"
import { FC, PropsWithChildren } from "react";

interface props{
    title: string;
}
const CustomAlert:FC<PropsWithChildren<props>> = ({title, children}) => {
    return (
        <Alert
            message={title}
            description={children}
            type="info"
            showIcon
        />
    )
}

export default CustomAlert