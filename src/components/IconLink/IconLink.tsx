'use client'
import { PlusCircleOutlined } from "@ant-design/icons"
import { FC, PropsWithChildren } from "react"

interface props{
    type: 'add'
}

const IconLink:FC<PropsWithChildren<props>> = ({children, type}) =>{
    return(
        <a>{children} {type === 'add' && <PlusCircleOutlined />} </a>
    )
}

export default IconLink