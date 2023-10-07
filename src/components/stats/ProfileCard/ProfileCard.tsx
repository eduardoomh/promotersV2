'use client'
import { Avatar, Col, Row } from 'antd'
import styles from './ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'
import { IUserSchema } from '@/models/User'
import { FC } from 'react'
import RoleTag from '@/components/utils/RoleTag'
import { ContactsOutlined, DollarOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'

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
                    <AvatarUser
                        letter={user?.name[0].toUpperCase()}
                        size='large'
                        align='vertical'
                        color='#176CBA'
                    >{user.name}
                    </AvatarUser>
                    <div className={styles.profile_email}>
                        <p><strong>Correo:</strong></p>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className={styles.profile_content}>
                    <article>
                        <section className={styles.section_item}>
                            <UserOutlined className={styles.icon} />
                            <p>Rol</p>
                            <p><RoleTag role={user.role} /></p>
                        </section>


                        <section className={styles.section_item}>
                            <UserOutlined className={styles.icon} />
                            <p>Alta de usuarios</p>
                            <p className={styles.count}>{stats.usuariosCount}</p>
                        </section>

                    </article>

                    <article>
                        <section className={styles.section_item}>
                            <ContactsOutlined className={styles.icon}/>
                            <p>Alta de promotores</p>
                            <p className={styles.count}>{stats.promotoresCount}</p>
                        </section>


                        <section className={styles.section_item}>
                            <SolutionOutlined className={styles.icon} />
                            <p>Alta de cupones</p>
                            <p className={styles.count}>6</p>
                        </section>

                    </article>

                    <article>
                        <section className={styles.section_item}>
                            <UserOutlined className={styles.icon} />
                            <p>Fecha de creación</p>
                            <p className={styles.date}>12 de agosto 2023</p>
                        </section>


                        <section className={styles.section_item}>
                            <DollarOutlined className={styles.icon} />
                            <p>Movimientos realizados</p>
                            <p className={styles.count}>6</p>
                        </section>

                    </article>
                </div>

            </section>
        </article>
    )
}

export default ProfileCard