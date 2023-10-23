'use client'
import React, { FC, useContext } from 'react';
import { Table, Tooltip } from 'antd';
import moment from 'moment';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    orders: any[];
    couponId: number;
}

const OrdersTable: FC<Props> = ({ orders, couponId }) => {
    const router = useRouter()
    const {startLoading} = useContext(GlobalContext)

    const handleActionClick = (id: string) => {
        startLoading()
        router.push(`/cupones/${couponId}/${id}`);
    };

    const columns = [
        {
            title: 'Número de pedido',
            render: (data: any) =>
                <>
                    {data.number}
                </>
        },
        {
            title: 'Total',
            render: (data: any) =>
                <>
                    {data.total}
                </>
        },
        {
            title: 'Estatus',
            render: (data: any) => <p>{data.status === 'processing' ? 'Procesando' : 'Completado'}</p>,
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
                        <RightCircleOutlined
                            style={{ fontSize: '1.6rem', color: '#0D709A' }}
                            onClick={() => handleActionClick(data.id)} />
                    </Tooltip>

                </div>
            ),
        },
    ];


    return (
        <>

            <Table columns={columns} dataSource={orders} style={{ border: '1px solid #E6E6E6' }} />

        </>
    );
};

export default OrdersTable;