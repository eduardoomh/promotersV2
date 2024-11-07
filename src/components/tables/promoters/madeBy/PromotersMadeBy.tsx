'use client'
import React, { FC, useContext, useState } from 'react';
import { Table, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { IPromoterSchema } from '@/models/Promoter';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    promoters: IPromoterSchema[];
}

const PromotersTable: FC<Props> = ({ promoters }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)
    const [searchText] = useState<string>('');

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/promotores/${_id}`);
    };


    const columns = [
        {
            title: 'Nombre',
            render: (data: any) =>
                <>
                    <Avatar
                        style={{
                            backgroundColor: '#176CBA',
                            verticalAlign: 'middle',
                            marginRight: '0.4rem'
                        }}
                        size='default'
                        gap={1}>
                        {data.user.name[0].toUpperCase()}
                    </Avatar>
                    {data.user.name}
                </>
        },
        {
            title: 'Email',
            render: (data: any) => <a>{data.user?.email}</a>,
        },
        {
            title: 'Teléfono',
            render: (data: any) => <a>{data.user_info?.mobile_phone}</a>,
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
                    <Tooltip placement="top" title={'Ver más información'}>
                        <RightCircleOutlined style={{ fontSize: '2rem', color: '#0D709A' }} onClick={() => handleDetailClick(data.id)} />
                    </Tooltip>
                </div>
            ),
        },
    ];



    const filteredPromoters = promoters.filter((promoter) =>
        Object.values(promoter.user)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <>
            {/* @ts-ignore */}
            <Table columns={columns} dataSource={filteredPromoters} style={{ border: '1px solid #E6E6E6' }} />
        </>
    );
};

export default PromotersTable;
