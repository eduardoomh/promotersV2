'use client'
import React, { FC } from 'react';
import { Table, Avatar } from 'antd';
import moment from 'moment';
import { IMovementSchema } from '@/models/Movement';

interface Props {
    movements: IMovementSchema[];
}

const MovementsByUser: FC<Props> = ({ movements }) => {

    const columns = [
        {
            title: 'Concepto',
            render: (data: any) => <a>{data.description}</a>,
        },
        {
            title: 'Cantidad',
            render: (data: any) => <a>{data.type === 'discount' ? '-' : ''}${data.amount} mxn</a>,
        },
        {
            title: 'Saldo anterior',
            render: (data: any) => <a>${data.security.before_mod} mxn</a>,
        },
        {
            title: 'Saldo posterior',
            render: (data: any) => <a>${data.security.after_mod} mxn</a>,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
        }
    ];


    return (
        <>
            <Table columns={columns} dataSource={movements} style={{ border: '1px solid #E6E6E6' }} />
        </>
    );
};

export default MovementsByUser;