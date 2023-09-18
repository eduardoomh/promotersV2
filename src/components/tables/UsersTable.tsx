'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input } from 'antd';
import { IUserSchema } from '@/models/User';
import RoleTag from '../utils/RoleTag';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../SubtitleSearch/SubtitleSearch';

interface Props {
    users: IUserSchema[];
}

const UsersTable: FC<Props> = ({ users }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/usuarios?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`/usuarios?actualizar=${_id}`);
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
                    <Tooltip placement="top" title={'Actualizar usuario'}>
                        <EditOutlined 
                            onClick={() => handleUpdateClick(data._id)}
                            style={{ cursor: 'pointer' }} 
                            />
                    </Tooltip>
                    <Tooltip placement="top" title={'Eliminar usuario'}>
                        <DeleteOutlined
                            //@ts-ignore
                            onClick={() => handleDeleteClick(data._id, data.email)}
                            style={{ color: '#ec1912', cursor: 'pointer' }}
                        />
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
            <SubitleSearch title='USUARIOS REGISTRADOS'>
                <Input.Search
                placeholder="Buscar"
                onChange={(e) => setSearchText(e.target.value)}
                style={{  width: 300, fontSize: '1rem'}}
            />
            </SubitleSearch>
            <br/>
            {/* @ts-ignore */}
            <Table columns={columns} dataSource={filteredUsers} />
        </>
    );
};

export default UsersTable;

