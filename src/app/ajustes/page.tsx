import EndLoading from "@/components/EndLoading/EndLoading";
import TitleCard from "@/components/TitleCard/TitleCard";
import styles from '../usuarios/Users.module.css'
import FormCard from "@/components/FomCard/FormCard";
import NewSettingForm from "@/components/forms/settings/NewSettingForm";
import CustomAlert from "@/components/CustomAlert/CustomAlert";

async function loadSettings() {
  const settings = await fetch(`${process.env.API_URL}/api/settings`, { cache: 'no-store' })
  const response = await settings.json()
  if (response.settings) {
    return response.settings
  }
  return response

}

export default async function Ajustes() {

  const settings: any = await loadSettings()

  return (
    <main>
      <EndLoading />
      <section className={styles.content}>
         <div className={styles.content_title}>
          <TitleCard>AJUSTES</TitleCard>
        </div>
        <div className={styles.form}>
          <FormCard>
            <NewSettingForm settings={settings} />
          </FormCard>
        </div>
        <div className={styles.table_content}>
          <CustomAlert title='AJUSTES DE LA TIENDA'>
            Agrega las claves de api rest de la tienda online para que el sistema pueda conectarse con los cupones, pedidos y productos de la tienda.
          </CustomAlert>
        </div>
      </section>
    </main>

  )
}
