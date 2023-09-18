'use client'
import React, { FC } from 'react';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUserSchema } from '@/models/User';
import RoleTag from '../utils/RoleTag';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


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
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: () => (
            <div className='flex gap-3'>
                <Tooltip 
                    placement="top"
                    title={'Actualizar usuario'}
                    >
                    <EditOutlined style={{cursor: 'pointer'}} />
                </Tooltip>
                <Tooltip placement="top" title={'Eliminar usuario'}>
                    <DeleteOutlined style={{ color: '#ec1912', cursor: 'pointer' }} />
                </Tooltip>
            </div>
        )
    }
];


interface props {
    users: IUserSchema[]
}
const UsersTable: FC<props> = ({ users }) => {
    return (
        <Table columns={columns} dataSource={users} />
    )
}


export default UsersTable



