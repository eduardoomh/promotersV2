'use client'
import styles from './UsersCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser' 

const UsersCard = () => {
    return (
        <article className={styles.general}>
            <h2>ADMINISTRADORES RECIENTES</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_content}>
                    <AvatarUser
                        letter={'J'}
                        size='default'>Joselu hernandez - <strong>juan@juan.com</strong>
                    </AvatarUser>
                    <AvatarUser letter={'J'} size='default'>Joselu hernandez - <strong>juan@juan.com</strong></AvatarUser>
                    <AvatarUser letter={'J'} size='default'>Joselu hernandez - <strong>juan@juan.com</strong></AvatarUser>
                </div>

            </section>
        </article>
    )
}

export default UsersCard