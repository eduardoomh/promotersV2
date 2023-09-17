import EndLoading from "@/components/EndLoading/EndLoading";
import { ISettingSchema } from "@/models/Settings";

async function loadSettings() {
  const settings = await fetch(`${process.env.API_URL}/api/settings`)
  const response = await settings.json()
  return response.settings
}

export default async function Ajustes() {

  const ssds = await loadSettings()
  console.log(ssds)
  const settings: any = []

  return (
    <main>
      <EndLoading />
      <h1>Ajustes</h1>
      <div>
        {
          settings.map((el: ISettingSchema) => (
            <div key={el._id}>
              <p>{el.woo_keys.client_id}</p>
              <p>{el.woo_keys.client_secret}</p>
              <p>{el.woo_keys.store_url}</p>
            </div>

          ))
        }
      </div>
    </main>

  )
}
