import styles from './home.module.css'
import EndLoading from '@/components/EndLoading/EndLoading'

interface NextPageProps {
  user: any
}

export default function Home(props: NextPageProps) {
  console.log(props, "las props")
  return (
    <>
      <EndLoading />
      <h1 className={styles.title}>BIENVENIDO DE VUELTA</h1>
    </>

  )
}
