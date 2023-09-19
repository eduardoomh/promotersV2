'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input } from 'antd';
import { IUserSchema } from '@/models/User';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import { IPromoterSchema } from '@/models/Promoter';

interface Props {
    promoters: IPromoterSchema[];
}

const PromotersTable: FC<Props> = ({ promoters }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');

    const handleDeleteClick = (_id: string, email: string) => {
        router.push(`/promotores?eliminar=${_id}&correo=${email}`);
    };

    const handleUpdateClick = (_id: string) => {
        router.push(`/promotores?actualizar=${_id}`);
    };


    const columns = [
        {
            title: 'Nombre',
            render: (data: any) => <a>{data.user?.name}</a>,
        },
        {
            title: 'Email',
            render: (data: any) => <a>{data.user?.email}</a>,
        },
        {
            title: 'Teléfono',
            render: (data: any) => <a>{data.personal_info?.mobile_phone}</a>,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Acciones',
            render: (data: IPromoterSchema) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Actualizar promotor'}>
                        <EditOutlined 
                            onClick={() => handleUpdateClick(data._id)}
                            style={{ cursor: 'pointer' }} 
                            />
                    </Tooltip>
                    <Tooltip placement="top" title={'Eliminar promotor'}>
                        <DeleteOutlined
                            //@ts-ignore
                            onClick={() => handleDeleteClick(data._id, data.user.email)}
                            style={{ color: '#ec1912', cursor: 'pointer' }}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    const filteredPromoters = promoters.filter((promoter) =>
        Object.values(promoter)
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
                style={{  width: 300, fontSize: '1rem'}}
            />
            </SubitleSearch>
            <br/>
            {/* @ts-ignore */}
            <Table columns={columns} dataSource={filteredPromoters} />
        </>
    );
};

export default PromotersTable;

