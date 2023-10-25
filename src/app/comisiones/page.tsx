import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../usuarios/Users.module.css'
import DeleteConfirm from "@/components/PageModals/delete/DeleteConfirm";
import ActionsModal from "@/components/PageModals/actions/ActionsModal";
import CommissionsTable from "@/components/tables/commissions/CommissionsTable";

async function loadCommissions() {
  const commissions = await fetch(`${process.env.API_URL}/api/commissions`, { 
    cache: 'no-store'
  })
  const response = await commissions.json()

  return {
    commissions: response.commissions,
  }
}

export default async function Commissions() {
  const { commissions }: any = await loadCommissions()
    return (
      <main className={styles.main}>
      <EndLoading />
      <section className={styles.content}>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <CommissionsTable commissions={commissions} />
          </div>
          <div className={styles.table_mobile}>
          </div>
        </div>
      </section>
        <DeleteConfirm type='commissions' url='/comisiones' />
      <ActionsModal type='commissions' url='/comisiones' />
    </main>
  
    )
  }
  