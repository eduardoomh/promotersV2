'use client'
import React, { FC, useContext, useState } from 'react';
import { Table, Tooltip, Input, Avatar } from 'antd';
import { IUserSchema } from '@/models/User';
import RoleTag from '../../utils/RoleTag';
import moment from 'moment';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import { GlobalContext } from '@/context/globalContext';
import CustomCard from '@/components/CustomCard/CustomCard';
import Link from 'next/link';

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

    const handleActionClick = (_id: string, email: string) => {
        router.push(`/usuarios?action=${_id}&correo=${email}`);
    };

    const handleCreateClick = (_id: string, email: string) => {
        router.push(`/usuarios?crear`);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (data: any) =>
            <>
                <Avatar
                    style={{
                        backgroundColor: '#0D709A',
                        verticalAlign: 'middle',
                        marginRight: '0.4rem'
                    }}
                    size='default'
                    gap={1}>
                    {data[0].toUpperCase()}
                </Avatar>
                <span style={{marginLeft: '0.5rem'}}>{data}</span>
            </>
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
                    <InfoCircleOutlined 
                        style={{fontSize: '1.6rem', color: '#0D709A'}} 
                        onClick={() => handleActionClick(data.id, data.email)} />
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
                    style={{ width: 300, fontSize: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <CustomCard>
                <Table columns={columns} dataSource={filteredUsers} style={{border: '1px solid #E6E6E6'}} />
                <br/>
                <Link href='/usuarios?crear=true'>
                    <p style={{
                        padding: '0.4rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        backgroundColor: '#fafafa',
                        border: '1px solid #d0d0d0'
                    }}>
                        <PlusCircleOutlined /> Crear nuevo usuario
                    </p>
                   
                </Link>
            </CustomCard>
            
        </>
    );
};

export default UsersTable;

