'use client'
import styles from '../ProfileCard/ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'

const PromotersCard = () => {
    return (
        <article className={styles.general}>
            <h2>PROMOTORES RECIENTES</h2>
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

export default PromotersCard