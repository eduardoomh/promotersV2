'use client'
import React, { FC } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUserSchema } from '@/models/User';


const columns: ColumnsType<IUserSchema> = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (email) => <a>{email}</a>,
    },
    {
        title: 'Rol',
        dataIndex: 'role',
        key: 'role',
        render: (role) => {
            return  <Tag color={role === 'promoter' ? '#EC1912' : '#108ee9'}>{role === 'promoter' ? 'Promotor' : 'Admin'}</Tag>
        }
    }
];


interface props{
    users: IUserSchema[]
}
const UsersTableMob:FC<props> = ({users}) => {
    return (
        <Table columns={columns} dataSource={users} scroll={{x: 200}} />
    )
}


export default UsersTableMob



