'use client'
import React, { FC, useContext, useState } from 'react';
import { Table, Tooltip, Input } from 'antd';
import { IUserSchema } from '@/models/User';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import { Link as ScrollLink, Element } from 'react-scroll'
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
            render: (data: IUserSchema) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Actualizar usuario'}>
                        <ScrollLink
                            to="nuevo-usuario" // ID del elemento al que deseas desplazarte
                            spy={true}
                            smooth={true}
                            duration={500} // Duración de la animación en milisegundos
                            offset={-100} // Desplazamiento adicional si es necesario
                        >
                            <EditOutlined
                                onClick={() => handleUpdateClick(data._id)}
                                style={{ cursor: 'pointer' }}
                            />
                        </ScrollLink>

                    </Tooltip>
                    <Tooltip placement="top" title={'Eliminar usuario'}>
                        <DeleteOutlined
                            //@ts-ignore
                            onClick={() => handleDeleteClick(data._id, data.email)}
                            style={{ color: '#ec1912', cursor: 'pointer' }}
                        />
                    </Tooltip>
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
            <SubitleSearch title='USUARIOS REGISTRADOS'>
                <Input.Search
                    placeholder="Buscar"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300, fontSize: '1rem', marginLeft: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <Table
                columns={columns}
                dataSource={filteredUsers}
                scroll={{ x: 200 }}

            />
        </>
    );
};

export default UsersTable;

