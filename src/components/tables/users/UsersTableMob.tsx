'use client'
import React, { FC } from 'react';
import { Avatar } from 'antd';
import { IUserSchema } from '@/models/User';
import { useRouter } from 'next/navigation';
import styles from './madeBy/UsersMadeBy.module.css'
import CustomCard from '@/components/CustomCard/CustomCard';
import Subtitle from '@/components/Subtitle/Subtitle';
import { PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
interface Props {
    users: IUserSchema[];
}

const UsersTable: FC<Props> = ({ users }) => {
    const router = useRouter()

    const handleActionClick = (_id: string, email: string) => {
        router.push(`/usuarios?action=${_id}&correo=${email}`);
    };


    return (
        <>
            <CustomCard>
                <center>
                    <Subtitle>USUARIOS REGISTRADOS</Subtitle>
                </center>
            </CustomCard>
            <br />
            <CustomCard>
                <ul className={styles.container}>
                    {
                        users.map(el => (
                            <section
                                key={el.id}
                                className={styles.section}
                                onClick={() => handleActionClick(el.id, el.email)}>
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
                <br />
                <Link href='/usuarios?crear=true'>
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
                        <PlusCircleOutlined /> Crear nuevo usuario
                    </p>
                </Link>

            </CustomCard>

        </>
    );
};

export default UsersTable;


