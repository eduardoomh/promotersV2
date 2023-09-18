'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input, Space, Button } from 'antd';
import { IUserSchema } from '@/models/User';
import RoleTag from '../utils/RoleTag';
import moment from 'moment';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleCard from '../SubtitleCard/SubtitleCard';
import SubitleSearch from '../SubtitleSearch/SubtitleSearch';

interface Props {
    users: IUserSchema[];
}

const UsersTable: FC<Props> = ({ users }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/usuarios?eliminar=${_id}&correo=${email}`);
    };


    const handleSearch = (selectedKeys: string[], confirm: () => void) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        //@ts-ignore
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string, record: IUserSchema) =>
            //@ts-ignore
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
    });

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
                        <EditOutlined style={{ cursor: 'pointer' }} />
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
                style={{  width: 300, fontSize: '1rem', marginLeft: '1rem' }}
            />
            </SubitleSearch>
            <br/>
            {/* @ts-ignore */}
            <Table columns={columns} dataSource={filteredUsers} />
        </>
    );
};

export default UsersTable;

