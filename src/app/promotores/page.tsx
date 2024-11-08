import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../usuarios/Users.module.css'
import PromotersTable from "@/components/tables/promoters/PromotersTable";
import DeleteConfirm from "@/components/PageModals/delete/DeleteConfirm";
import PromotersTableMob from "@/components/tables/promoters/PromotersTableMob";
import GenericForm from "@/components/PageModals/genericForm/GenericForm";
import ActionsModal from "@/components/PageModals/actions/ActionsModal";

async function loadPromoters() {
  const promoters = await fetch(`${process.env.API_URL}/api/promoters`, { 
    cache: 'no-store'
  })
  const users = await fetch(`${process.env.API_URL}/api/users?role=promoter`, { cache: 'no-store' })
  const promoters_response = await promoters.json()
  const users_response = await users.json()

  return {
    promoters: promoters_response.promoters,
    users: users_response.users
  }
}

export default async function Promotores() {
  const { promoters, users }: any = await loadPromoters()

  return (
    <main className={styles.main}>
      <EndLoading />
      <section className={styles.content}>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <PromotersTable promoters={promoters} />
          </div>
          <div className={styles.table_mobile}>
            <PromotersTableMob promoters={promoters} />
          </div>

        </div>
      </section>
      <DeleteConfirm type='promoters' url='/promotores' />
      <ActionsModal type='promoters' url='/promotores' />
      < GenericForm
          users={users}
          url='/promotores'
          type='promoters'
          promoters={promoters} 
          data={null}
          />
    </main>

  )
}