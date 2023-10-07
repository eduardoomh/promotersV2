'use client'
import styles from '../ProfileCard/ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'
import { FC } from 'react'
import { IUserSchema } from '@/models/User'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import AvatarItem from '../AvatarItem/AvatarItem'

interface props {
    data: IUserSchema[]
    user?: boolean
}
const PromotersCard: FC<props> = ({ data, user = false }) => {
    return (
        <article className={styles.general}>
            <h2>{user ? 'USUARIOS' : 'PROMOTORES'} RECIENTES</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_content}>
                    {
                        data.length > 0 ? data.map((el: IUserSchema) => (
                            <AvatarItem
                                key={el._id}
                                letter={el.name[0].toUpperCase()}
                                user={el}
                                size='large'
                                color={user ? '#0D709A' :'#528FA9'}
                                //@ts-ignore
                                url={user ? `/usuarios/${el._id}` : `/promotores/${el?.promotersData[0]._id}`}
                                />
                        )) : <EmptyImg />
                    }
                </div>

            </section>
        </article>
    )
}

export default PromotersCard