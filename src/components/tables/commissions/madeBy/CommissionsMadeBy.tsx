'use client'
import React, { FC, useContext } from 'react';
import { Table, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ICommissionSchema } from '@/models/Comissions';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    commissions: ICommissionSchema[];
}

const CommissionsMadeBy: FC<Props> = ({ commissions }) => {
    const router = useRouter()
    const {startLoading} = useContext(GlobalContext)

    const handleActionClick = (_id: string) => {
        startLoading()
        router.push(`/comisiones/${_id}`);
    };

    const columns = [
        {
            title: 'Nombre',
            render: (data: any) =>
                <>
                    <Avatar
                        style={{
                            backgroundColor: '#528FA9',
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
            title: 'Correo',
            render: (data: any) => <a>{data.user?.email}</a>,
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
            title: 'Cupón',
            render: (data: any) => <a>{data.coupon.code}</a>,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
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
console.log(commissions, "hayy")
    return (
        <>

                <Table columns={columns} dataSource={commissions} style={{ border: '1px solid #E6E6E6' }} />

        </>
    );
};

export default CommissionsMadeBy;