'use client'
import React, { FC, useContext } from 'react';
import { Avatar } from 'antd';
import { IPromoterSchema } from '@/models/Promoter';
import styles from '../../users/madeBy/UsersMadeBy.module.css'
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    promoters: IPromoterSchema[];
}

const PromotersMobileMadeBy: FC<Props> = ({ promoters }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)
    
    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/promotores/${_id}`);
    };

    return (
        <ul className={styles.container}>
            {
                promoters.map(el => (
                    <section className={styles.section} onClick={() => handleDetailClick(el._id)}>
                        <Avatar
                            style={{
                                backgroundColor: '#0D709A',
                                verticalAlign: 'middle',
                                marginRight: '0.4rem'
                            }}
                            size='default'
                            gap={1}>
                            { 
                            //@ts-ignore
                            el.user?.name[0].toUpperCase()
                            }
                        </Avatar>
                        { //@ts-ignore 
                        el.user?.name}
                    </section >
                ))
            }
        </ul >
    );
};

export default PromotersMobileMadeBy;

