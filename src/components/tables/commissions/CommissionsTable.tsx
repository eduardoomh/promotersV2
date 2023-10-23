'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input, Avatar } from 'antd';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import CustomCard from '@/components/CustomCard/CustomCard';
import { ICommissionSchema } from '@/models/Comissions';

interface Props {
    commissions: ICommissionSchema[];
}

const CommissionsTable: FC<Props> = ({ commissions }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');

    const handleActionClick = (_id: string) => {
        router.push(`/comisiones?action=${_id}`);
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
                <a>
                    {
                        data.earnings.type === 'percentage' ?
                            `%${data.earnings.amount}` :
                            `$${data.earnings.amount} mxn`
                    }
                </a>,
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
                        <InfoCircleOutlined
                            style={{ fontSize: '1.6rem', color: '#0D709A' }}
                            onClick={() => handleActionClick(data._id)} />
                    </Tooltip>

                </div>
            ),
        },
    ];


    const filteredCommission = commissions.filter((commission) =>
        Object.values(commission.user)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <>
            <SubitleSearch title='COMISIONES RECIENTES'>
                <Input.Search
                    placeholder="Buscar"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300, fontSize: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <CustomCard>
                <Table columns={columns} dataSource={filteredCommission} style={{ border: '1px solid #E6E6E6' }} />
                <br />
            </CustomCard>

        </>
    );
};

export default CommissionsTable;