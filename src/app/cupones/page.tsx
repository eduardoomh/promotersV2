/*
import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../usuarios/Users.module.css'
import DeleteConfirm from "@/components/PageModals/users/DeleteConfirm";
import ActionsModal from "@/components/PageModals/actions/ActionsModal";
import CouponsTable from "@/components/tables/coupons/CouponsTable";

async function loadCoupons() {
  const coupons = await fetch(`${process.env.API_URL}/api/coupons`, { 
    cache: 'no-store'
  })
  const response = await coupons.json()

  return {
    coupons: response.coupons,
  }
}

export default async function Cupones() {
  const { coupons }: any = await loadCoupons()
    return (
      <main className={styles.main}>
      <EndLoading />
      <section className={styles.content}>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <CouponsTable coupons={coupons} />
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
  export default async function Cupones() {
    return <></>
  }