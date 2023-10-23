import EndLoading from "@/components/EndLoading/EndLoading";
import styles from './Users.module.css'
import UsersTable from "@/components/tables/users/UsersTable";
import UsersTableMob from "@/components/tables/users/UsersTableMob";
import DeleteConfirm from "@/components/PageModals/users/DeleteConfirm";
import ActionsModal from "@/components/PageModals/actions/ActionsModal";
import GenericForm from "@/components/PageModals/genericForm/GenericForm";

async function loadUsers() {
  const users = await fetch(`${process.env.API_URL}/api/users`, { cache: 'no-store' })
  const response = await users.json()
  return response.users
}

export default async function Usuarios() {
  const users: any = await loadUsers()

  return (
    <main className={styles.main}>
      <EndLoading />
      <section className={styles.content}>
        {/*
          <div className={styles.form}>
            <FormCard>
              <NewUserForm users={users} />
            </FormCard>
          </div>
       */ }
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
      <ActionsModal type='users' url='/usuarios'/>
      < GenericForm
          users={users}
          url='/usuarios'
          type='users'
          promoters={[]} />
    </main>

  )
}
