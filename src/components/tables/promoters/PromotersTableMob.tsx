'use client'
import React, { FC, useContext, useState } from 'react';
import { Table, Tooltip, Input, Avatar } from 'antd';
import { IUserSchema } from '@/models/User';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import { IPromoterSchema } from '@/models/Promoter';
import { Link as ScrollLink, Element } from 'react-scroll'
import { GlobalContext } from '@/context/globalContext';

interface Props {
    promoters: IPromoterSchema[];
}

const PromotersTableMob: FC<Props> = ({ promoters }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)
    const [searchText, setSearchText] = useState<string>('');

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/promotores?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`/promotores?actualizar=${_id}`);
    };

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/promotores/${_id}`);
    };

    const columns = [
        {
            title: 'Nombre',
            render: (data: any) => <a>
                <Avatar
                    style={{
                        backgroundColor: '#EC1912',
                        verticalAlign: 'middle',
                        marginRight: '0.4rem'
                    }}
                    size='small' 
                    gap={1}>
                    {data.user.name[0].toUpperCase()}
                </Avatar>
                {data.user.name}
                </a>,
        },
        {
            title: 'Acciones',
            render: (data: IUserSchema) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Actualizar promotor'}>
                        <ScrollLink
                            to="nuevo-promotor" // ID del elemento al que deseas desplazarte
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
                    <Tooltip placement="top" title={'Eliminar promotor'}>
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

    const filteredPromoters = promoters.filter((promoter) =>
        Object?.values(promoter.user)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <>
            <SubitleSearch title='PROMOTORES REGISTRADOS'>
                <Input.Search
                    placeholder="Buscar"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250, fontSize: '1rem', marginLeft: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <Table
                columns={columns}
                dataSource={filteredPromoters}
                scroll={{ x: 200 }}
            />
        </>
    );
};

export default PromotersTableMob;

