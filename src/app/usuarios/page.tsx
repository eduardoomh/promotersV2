import EndLoading from "@/components/EndLoading/EndLoading";
import styles from './Users.module.css'
import UsersTable from "@/components/tables/UsersTable";
import TitleCard from "@/components/TitleCard/TitleCard";
import SubitleCard from "@/components/SubtitleCard/SubtitleCard";
import UsersTableMob from "@/components/tables/UsersTableMob";

async function loadUsers() {
  const users = await fetch(`${process.env.API_URL}/api/users`)
  const response = await users.json()
  return response.users
}
export default async function Usuarios() {
  const users = await loadUsers()

  return (
    <main className={styles.main}>
      <EndLoading />
      <TitleCard>USUARIOS</TitleCard> 
      <section className={styles.content}>
        <div className={styles.form}>
          <h3>CREAR NUEVO USUARIO</h3>
          <hr />
        </div>
        <div className={styles.table_content}>
          <div className={styles.table_title}>
            <SubitleCard>USUARIOS REGISTRADOS</SubitleCard>
          </div>
          <div className={styles.table_desktop}>
             <UsersTable users={users} />
          </div>
          <div className={styles.table_mobile}>
             <UsersTableMob users={users} />
          </div>
         
        </div>
        <section className={styles.add_user}>
          Agregar nuevo usuario
        </section>
      </section>
    </main>

  )
}
