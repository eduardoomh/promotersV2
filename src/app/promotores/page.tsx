import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../usuarios/Users.module.css'
import FormCard from "@/components/FomCard/FormCard";
import TitleCard from "@/components/TitleCard/TitleCard";
import PromotersTable from "@/components/tables/promoters/PromotersTable";
import DeleteConfirm from "@/components/PageModals/promoters/DeleteConfirm";
import NewPromoterForm from "@/components/forms/promoters/NewPromoterForm";

async function loadPromoters() {
  const promoters = await fetch(`${process.env.API_URL}/api/promoters`, { cache: 'no-store' })
  const response = await promoters.json()
  return response.promoters
}

export default async function Promotores() {
  const promoters: any = await loadPromoters()

  return (
    <main className={styles.main}>
      <EndLoading />
      <TitleCard>PROMOTORES</TitleCard>
      <section className={styles.content}>
        <div className={styles.form}>
          <FormCard>
            <NewPromoterForm promoters={promoters} />
          </FormCard>
        </div>
        <div className={styles.table_content}>
          <div className={styles.table_desktop}>
            <PromotersTable promoters={promoters} />
          </div>
          <div className={styles.table_mobile}>
            <PromotersTable promoters={promoters} />
          </div>

        </div>
      </section>
      <DeleteConfirm />
    </main>

  )
}
