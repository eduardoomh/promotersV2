'use client'
import React, { FC } from 'react';
import { Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import styles from '../users/madeBy/UsersMadeBy.module.css'
import CustomCard from '@/components/CustomCard/CustomCard';
import Subtitle from '@/components/Subtitle/Subtitle';
import { PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IPromoterSchema } from '@/models/Promoter';
interface Props {
    promoters: IPromoterSchema[];
}

const PromotersTableMob: FC<Props> = ({ promoters }) => {
    const router = useRouter()

    const handleActionClick = (_id: string, email: string) => {
        router.push(`/promotores?action=${_id}&correo=${email}`);
    };

    return (
        <>
            <CustomCard>
                <center>
                    <Subtitle>PROMOTORES REGISTRADOS</Subtitle>
                </center>
            </CustomCard>
            <br />
            <CustomCard>
                <ul className={styles.container}>
                    {
                        promoters.map((el: any) => (
                            <section
                                key={el._id}
                                className={styles.section}
                                onClick={() => handleActionClick(el._id, el.user.email)}>
                                <Avatar
                                    style={{
                                        backgroundColor: '#0D709A',
                                        verticalAlign: 'middle',
                                        marginRight: '0.4rem'
                                    }}
                                    size='default'
                                    gap={1}>
                                    {el.user.name[0].toUpperCase()}
                                </Avatar>
                                {el.user.name}
                            </section >
                        ))
                    }
                </ul >
                <br />
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

export default PromotersTableMob;


