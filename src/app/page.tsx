import styles from './home.module.css'
import EndLoading from '@/components/EndLoading/EndLoading'

export default function Home() {
  return (
    <>
      <EndLoading />
      <h1 className={styles.title}>BIENVENIDO DE VUELTA</h1>
    </>

  )
}
