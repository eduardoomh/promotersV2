'use client'
import React, { FC, useContext } from 'react';
import { Avatar } from 'antd';
import { IUserSchema } from '@/models/User';
import styles from './UsersMadeBy.module.css'
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

interface Props {
    users: IUserSchema[];
}

const UsersMobileMadeBy: FC<Props> = ({ users }) => {
    const router = useRouter()
    const { startLoading } = useContext(GlobalContext)

    const handleDetailClick = (_id: string) => {
        startLoading()
        router.push(`/usuarios/${_id}`);
    };

    return (
        <ul className={styles.container}>
            {
                users.map(el => (
                    <section
                        key={el.id}
                        className={styles.section}
                        onClick={() => handleDetailClick(el.id)}>
                        <Avatar
                            style={{
                                backgroundColor: '#0D709A',
                                verticalAlign: 'middle',
                                marginRight: '0.4rem'
                            }}
                            size='default'
                            gap={1}>
                            {el.name[0].toUpperCase()}
                        </Avatar>
                        {el.name}
                    </section >
                ))
            }
        </ul >
    );
};

export default UsersMobileMadeBy;

