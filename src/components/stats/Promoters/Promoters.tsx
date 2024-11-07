'use client'
import styles from '../ProfileCard/ProfileCard.module.css'
import { FC } from 'react'
import { IUserSchema } from '@/models/User'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import AvatarItem from '../AvatarItem/AvatarItem'

interface props {
    data: IUserSchema[]
    user?: boolean
}
const PromotersCard: FC<props> = ({ data, user = false }) => {
    console.log(data, "hay algo?")
    return (
        <article className={styles.general}>
            <h2>{user ? 'USUARIOS' : 'PROMOTORES'} RECIENTES</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_content}>
                    {
                        user ?
                            data && data?.length > 0 ? data.map((el: IUserSchema) => (
                                <AvatarItem
                                    key={el.id}
                                    letter={el.name[0].toUpperCase() || '?'}
                                    user={el}
                                    size='large'
                                    color={user ? '#0D709A' : '#528FA9'}
                                    //@ts-ignore
                                    url={`/usuarios/${el.id}`}
                                />
                            )) : <EmptyImg />
                            : data && data?.length > 0 ? data.map((el: IUserSchema) => (
                                <AvatarItem
                                    key={el.id}
                                    letter={el.name[0].toUpperCase() || '?'}
                                    user={el}
                                    size='large'
                                    color={user ? '#0D709A' : '#528FA9'}
                                    //@ts-ignore
                                    url={`/promotores/${el?.promoter?.id}`}
                                />
                            )) : <EmptyImg />
                    }
                </div>

            </section>
        </article>
    )
}

export default PromotersCard