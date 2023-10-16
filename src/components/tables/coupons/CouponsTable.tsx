'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input } from 'antd';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import CustomCard from '@/components/CustomCard/CustomCard';

interface Props {
    coupons: any[];
}

const CouponsTable: FC<Props> = ({ coupons }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');

    const handleActionClick = (_id: string) => {
        router.push(`/cupones?action=${_id}&correo=empty`);
    };

    const columns = [
        {
            title: 'Código',
            render: (data: any) =>
                <>
                    {data.code}
                </>
        },
        {
            title: 'discount_type',
            render: (data: any) => <p>{data.discount_type === 'percentage' ? 'Porcentaje' : 'Precio fijo'}</p>,
        },
        {
            title: 'Fecha',
            dataIndex: 'date_created',
            key: 'date_created',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Acciones',
            render: (data: any) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Ver más información'}>
                        <InfoCircleOutlined
                            style={{ fontSize: '1.6rem', color: '#0D709A' }}
                            onClick={() => handleActionClick(data.id)} />
                    </Tooltip>

                </div>
            ),
        },
    ];


    const filteredCoupons = coupons.filter((coupon) =>
        Object.values(coupon)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <>
            <SubitleSearch title='CUPONES DE LA TIENDA'>
                <Input.Search
                    placeholder="Buscar"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300, fontSize: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <CustomCard>
                <Table columns={columns} dataSource={filteredCoupons} style={{ border: '1px solid #E6E6E6' }} />
            </CustomCard>

        </>
    );
};

export default CouponsTable;