'use client'
import styles from '../ProfileCard/ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'
import { FC } from 'react'
import { IUserSchema } from '@/models/User'
import EmptyImg from '@/components/EmptyImg/EmptyImg'

interface props {
    data: IUserSchema[]
}
const PromotersCard: FC<props> = ({ data }) => {
    return (
        <article className={styles.general}>
            <h2>PROMOTORES RECIENTES</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_content}>
                    {
                        data.length > 0 ? data.map((el: IUserSchema) => (
                            <AvatarUser
                                key={el._id}
                                letter={el.name[0].toUpperCase()}
                                size='default'>{el.name} - <strong>{el.email}</strong>
                            </AvatarUser>
                        )) : <EmptyImg />
                    }
                </div>

            </section>
        </article>
    )
}

export default PromotersCard