import EndLoading from "@/components/EndLoading/EndLoading";
/*
async function loadPromoters() {
  const promoters = await fetch(`${process.env.API_URL}/api/promoters`)
  const response = await promoters.json()
  return response.promoters
}
*/
export default async function Promotores() {
  const promoters: any = [] //await loadPromoters()

  return (
    <main>
      <EndLoading />
      <h1>Promotores</h1>
      <div>
        {
          promoters.map((el: any) => (
            <p key={el._id}>{el.personal_info.name}</p>
          ))
        }
      </div>
    </main>

  )
}
