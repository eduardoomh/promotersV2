import TitleCard from '@/components/TitleCard/TitleCard'
import styles from './home.module.css'
import EndLoading from '@/components/EndLoading/EndLoading'

export default function Home() {
  return (
    <>
      <EndLoading />
      <TitleCard>BIENVENIDO DE VUELTA</TitleCard>
    </>

  )
}
