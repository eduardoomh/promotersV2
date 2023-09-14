import LoginSquare from '@/components/loginSquare/LoginSquare'
import styles from './login.module.css'
import LoginForm from '@/components/LoginForm/LoginForm'

export default function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <LoginSquare
          title={<>SISTEMA DE <br /> PROMOTORES</>}
          subtitle={<>INICIA SESIÓN CON TU <br />USUARIO Y CONTRASEÑA</>}
        />
        <LoginForm />
      </div>
    </main>

  )
}
