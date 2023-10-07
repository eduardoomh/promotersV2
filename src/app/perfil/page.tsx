import EndLoading from "@/components/EndLoading/EndLoading";
import TitleCard from "@/components/TitleCard/TitleCard";
import DeleteConfirm from "@/components/PageModals/users/DeleteConfirm";

export default async function Perfil() {

  return (
    <main>
      <EndLoading />
      <TitleCard>PERFIL</TitleCard>
      <p>logueado</p>
      <DeleteConfirm />
    </main>

  )
}
