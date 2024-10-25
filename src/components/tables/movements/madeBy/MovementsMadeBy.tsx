'use client'
import React, { FC, useContext } from 'react';
import { Table, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { IMovementSchema } from '@/models/Movement';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    movements: IMovementSchema[];
}

const MovementsTable: FC<Props> = ({ movements }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)

    const handleActionClick = (_id: string) => {
        startLoading()
        router.push(`/estado-de-cuenta/${_id}`);
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
            title: 'Cantidad',
            render: (data: any) => <a>{data.type === 'discount' ? '-' : ''}${data.amount} mxn</a>,
        },
        {
            title: 'Concepto',
            render: (data: any) => <a>{data.description}</a>,
        },
        {
            title: 'Saldo anterior',
            render: (data: any) => <a>${data.before_mod} mxn</a>,
        },
        {
            title: 'Saldo posterior',
            render: (data: any) => <a>${data.after_mod} mxn</a>,
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


    return (
        <>
            <Table columns={columns} dataSource={movements} style={{ border: '1px solid #E6E6E6' }} />
        </>
    );
};

export default MovementsTable;