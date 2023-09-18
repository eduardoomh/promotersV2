'use client'
import React, { FC } from 'react';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUserSchema } from '@/models/User';
import RoleTag from '../utils/RoleTag';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface props {
    users: IUserSchema[]
}
const UsersTable: FC<props> = ({ users }) => {
    const router = useRouter();

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/usuarios?eliminar=${_id}&correo=${email}`);
    };

    const columns: ColumnsType<IUserSchema> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                return <RoleTag role={role} />
            }
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => moment(date).format('DD/MM/YYYY')
        },
        {
            title: 'Acciones',
            render: (data) => (
                <div className='flex gap-3'>
                    <Tooltip
                        placement="top"
                        title={'Actualizar usuario'}
                    >
                        <EditOutlined style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip placement="top" title={'Eliminar usuario'}>
                        <DeleteOutlined
                            onClick={() => handleDeleteClick(data._id, data.email)}
                            style={{ color: '#ec1912', cursor: 'pointer' }}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];
    return (
        <Table columns={columns} dataSource={users} />
    )
}


export default UsersTable



