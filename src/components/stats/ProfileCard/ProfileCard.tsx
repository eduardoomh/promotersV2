'use client'
import { Avatar } from 'antd'
import styles from './ProfileCard.module.css'
import AvatarUser from '../AvatarUser/AvatarUser'

const ProfileCard = () => {
    return (
        <article className={styles.general}>
            <h2>PERFIL DEL USUARIO</h2>
            <hr />
            <section className={styles.profile_section}>
                <div className={styles.profile_title}>
                    <AvatarUser letter={'J'} size='default'>Joselu hernandez</AvatarUser>
                </div>
                <div className={styles.profile_content}>
                        <p><strong>Correo:</strong> joselu@joselu.com</p>
                        <p><strong>Rol:</strong> Administrador</p>
                        <p><strong>Alta de usuarios:</strong> 5</p>
                        <p><strong>Alta de promotores:</strong> 4</p>
                        <p><strong>Alta de cupones:</strong> 0</p>
                </div>

            </section>
        </article>
    )
}

export default ProfileCard