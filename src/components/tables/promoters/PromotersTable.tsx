'use client'
import React, { FC, useState } from 'react';
import { Table, Tooltip, Input, Avatar } from 'antd';
import moment from 'moment';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SubitleSearch from '../../SubtitleSearch/SubtitleSearch';
import { IPromoterSchema } from '@/models/Promoter';
import CustomCard from '@/components/CustomCard/CustomCard';
import Link from 'next/link';

interface Props {
    promoters: IPromoterSchema[];
}

const PromotersTable: FC<Props> = ({ promoters }) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>('');

    const handleActionClick = (_id: string, email: string) => {
        router.push(`/promotores?action=${_id}&correo=${email}`);
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
            render: (data: any) => (
                <div className='flex gap-3'>
                    <Tooltip placement="top" title={'Ver más información'}>
                    <InfoCircleOutlined 
                        style={{fontSize: '1.6rem', color: '#0D709A'}} 
                        onClick={() => handleActionClick(data._id, data.user?.email)} />
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
            <SubitleSearch title='PROMOTORES REGISTRADOS'>
                <Input.Search
                    placeholder="Buscar"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300, fontSize: '1rem' }}
                />
            </SubitleSearch>
            <br />
            {/* @ts-ignore */}
            <CustomCard>
                <Table columns={columns} dataSource={filteredPromoters} style={{border: '1px solid #E6E6E6'}} />
                <br/>
                <Link href='/promotores?crear=true'>
                    <p style={{
                        padding: '0.4rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        backgroundColor: '#fafafa',
                        border: '1px solid #d0d0d0'
                    }}>
                        <PlusCircleOutlined /> Crear nuevo promotor
                    </p>
                   
                </Link>
            </CustomCard>
            
        </>
    );
};

export default PromotersTable;