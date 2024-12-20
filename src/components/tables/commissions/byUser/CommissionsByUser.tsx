'use client'
import React, { FC, useContext, useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import moment from 'moment';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ICommissionSchema } from '@/models/Comissions';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    id: string;
    commissions: ICommissionSchema[];
}

const CommissionsByUser: FC<Props> = ({ commissions, id }) => {
    const router = useRouter()
    const {startLoading} = useContext(GlobalContext)

    const handleActionClick = (_id: string) => {
        startLoading()
        router.push(`/perfil/${id}/comisiones/${_id}`);
    };

    const columns = [
        {
            title: 'Cupón',
            render: (data: any) => <a>{data?.coupon?.code}</a>,
        },
        {
            title: 'Ganancias',
            render: (data: any) =>
                <p>
                    {
                        data.earning_type === 'percentage' ?
                            `${data.earning_amount}%` :
                            `$${data.earning_amount} mxn`
                    }
                </p>,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Detalles',
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

                <Table columns={columns} dataSource={commissions} style={{ border: '1px solid #E6E6E6' }} />

        </>
    );
};

export default CommissionsByUser;