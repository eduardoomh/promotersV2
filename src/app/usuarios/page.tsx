import EndLoading from "@/components/EndLoading/EndLoading";
import styles from './Users.module.css'
import UsersTable from "@/components/tables/users/UsersTable";
import TitleCard from "@/components/TitleCard/TitleCard";
import UsersTableMob from "@/components/tables/users/UsersTableMob";
import NewUserForm from "@/components/forms/users/NewUserForm";
import FormCard from "@/components/FomCard/FormCard";
import DeleteConfirm from "@/components/PageModals/users/DeleteConfirm";

async function loadUsers() {
  const users = await fetch(`${process.env.API_URL}/api/users`,{ cache: 'no-store' })
  const response = await users.json()
  return response.users
}

export default async function Usuarios() {
  const users: any = await loadUsers()

  return (
    <main className={styles.main}>
      <EndLoading />
      <TitleCard>USUARIOS</TitleCard>
      <section className={styles.content}>
        <div className={styles.form}>
          <FormCard>
            <NewUserForm users={users} />
          </FormCard>
        </div>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <UsersTable users={users} />
          </div>
          <div className={styles.table_mobile}>
            <UsersTableMob users={users} />
          </div>

        </div>
      </section>
      <DeleteConfirm />
    </main>

  )
}
