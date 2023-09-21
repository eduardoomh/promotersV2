import styles from './Usuario.module.css'
import EndLoading from "@/components/EndLoading/EndLoading"
import RoleTag from "@/components/utils/RoleTag"
import DateItem from "@/components/utils/DateItem"
import TitleReturn from "@/components/utils/TitleBack"
import AvatarUser from '@/components/stats/AvatarUser/AvatarUser'

async function loadUser({ params }: any) {
    const users = await fetch(`${process.env.API_URL}/api/users/${params.id}`, { cache: 'no-store' })
    const response = await users.json()
    return response.user
}

export default async function Usuario(props: any) {
    const user = await loadUser(props)
    return (
        <>
            <EndLoading />
            <TitleReturn path='/usuarios'>
                <AvatarUser
                    letter={user?.name[0].toUpperCase()}
                    size='large'>{user.name}
                </AvatarUser>
            </TitleReturn>
            <br />
            <article className={styles.info}>
                <h2>DATOS PERSONALES</h2>
                <p><strong>Nombre completo</strong></p>
                <p>{user.name}</p>
                <p><strong>Correo</strong></p>
                <p>{user.email}</p>
                <p><strong>Tipo de usuario</strong></p>
                <p><RoleTag role={user.role} /></p>
                <p><strong>Última modificación</strong></p>
                <p><DateItem date={user.updated_at} /></p>
                <p><strong>Fecha de creación</strong></p>
                <p><DateItem date={user.created_at} /></p>
            </article>
        </>

    )
}