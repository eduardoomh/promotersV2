'use client'
import { Avatar } from 'antd'
import styles from './ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'
import { IUserSchema } from '@/models/User'
import { FC } from 'react'
import RoleTag from '@/components/utils/RoleTag'

interface props {
    user: IUserSchema;
    stats: any;
}
const ProfileCard: FC<props> = ({ user, stats }) => {
    return (
        <article className={styles.general}>
            <h2>PERFIL DEL USUARIO</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_title}>
                    <AvatarUser letter={user?.name[0].toUpperCase()} size='default'>{user.name}</AvatarUser>
                </div>
                <div className={styles.profile_content}>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Alta de usuarios:</strong>{stats.usuariosCount}</p>
                    <p><strong>Alta de promotores:</strong>{stats.promotoresCount}</p>
                    <p><strong>Alta de cupones:</strong> 0</p>
                    <p><RoleTag role={user.role} /></p>
                </div>

            </section>
        </article>
    )
}

export default ProfileCard