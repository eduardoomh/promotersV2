'use client'
import React, { FC } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUserSchema } from '@/models/User';


const columns: ColumnsType<IUserSchema> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
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
            return  <Tag color={role === 'promoter' ? '#EC1912' : '#108ee9'}>{role === 'promoter' ? 'Promotor' : 'Admin'}</Tag>
        }
    },
    {
        title: 'Fecha de creación',
        dataIndex: 'created_at',
        key: 'created_at',
    }
];


interface props{
    users: IUserSchema[]
}
const UsersTable:FC<props> = ({users}) => {
    return (
        <Table columns={columns} dataSource={users} />
    )
}


export default UsersTable



