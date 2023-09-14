import styles from './home.module.css'
import CustomButton from '../components/Button'
import InputContainer from '../components/InputContainer'
import LoginForm from '../components/LoginForm/LoginForm'
import { Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import LogoutButton from '../components/header/LogoutButton'

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>BIENVENIDO DE VUELTA</h1>
    </>

  )
}
