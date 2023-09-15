import styles from './home.module.css'
import CustomButton from '../components/Button'
import InputContainer from '../components/InputContainer'
import LoginForm from '../components/LoginForm/LoginForm'
import { Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import LogoutButton from '../components/header/LogoutButton'
import EndLoading from '@/components/EndLoading/EndLoading'

export default function Home() {
  return (
    <>
      <EndLoading />
      <h1 className={styles.title}>BIENVENIDO DE VUELTA</h1>
    </>

  )
}
