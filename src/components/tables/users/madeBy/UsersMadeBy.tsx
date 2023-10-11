'use client'
import React, { FC, useContext, useState } from 'react';
import { Table, Tooltip } from 'antd';
import { IUserSchema } from '@/models/User';
import RoleTag from '../../../utils/RoleTag';
import moment from 'moment';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    users: IUserSchema[];
}

const UsersTable: FC<Props> = ({ users }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)
    const [searchText, setSearchText] = useState<string>('');

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/usuarios?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`/usuarios?actualizar=${_id}`);
    };

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/usuarios/${_id}`);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
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
            render: (role: string) => <RoleTag role={role} />,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Acciones',
            render: (data: IUserSchema) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Ver más información'}>
                        <ArrowRightOutlined onClick={() => handleDetailClick(data._id)} />
                    </Tooltip>

                </div>
            ),
        },
    ];

    const filteredUsers = users.filter((user) =>
        Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <>
            {/* @ts-ignore */}
                <Table columns={columns} dataSource={filteredUsers} style={{border: '1px solid #E6E6E6'}} />
            
        </>
    );
};

export default UsersTable;

