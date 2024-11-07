/*
import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../usuarios/Users.module.css'
import DeleteConfirm from "@/components/PageModals/users/DeleteConfirm";
import ActionsModal from "@/components/PageModals/actions/ActionsModal";
import MovementsTable from "@/components/tables/movements/MovementsTable";

async function loadMovements() {
  const movements = await fetch(`${process.env.API_URL}/api/movements`, { 
    cache: 'no-store'
  })
  const response = await movements.json()

  return {
    movements: response.movements,
  }
}

export default async function Movements() {
  const { movements }: any = await loadMovements()
    return (
      <main className={styles.main}>
      <EndLoading />
      <section className={styles.content}>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <MovementsTable movements={movements} />
          </div>
          <div className={styles.table_mobile}>
           
          </div>
        </div>
      </section>
      <DeleteConfirm />
      <ActionsModal type='coupons' url='/cupones' />
    </main>
  
    )
  }
  */
  export default async function Movements() {
    return <></>
  }