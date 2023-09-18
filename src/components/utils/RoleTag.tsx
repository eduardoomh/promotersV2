import { Tag } from "antd"
import { FC } from "react"

interface props {
    role: string
}
const RoleTag: FC<props> = ({ role }) => {
    return (
        <Tag
            style={{ display: 'flex', justifyContent: 'center', width: '4.5rem' }}
            color={role === 'promoter' ? '#EC1912' : '#108ee9'}>
            {role === 'promoter' ? 'Promotor' : 'Admin'}
        </Tag >
    )
}

export default RoleTag