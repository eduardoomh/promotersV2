import LoginSquare from '@/components/loginSquare/LoginSquare'
import styles from './ChangePassword.module.css'
import LoginChangeForm from '@/components/LoginChanceForm.tsx/LoginChangeForm'

export default function changePassword() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <LoginSquare
        title={<>CAMBIO DE <br /> CONTRASEÑA</>}
        subtitle={<>INTRODUCE UNA NUEVA <br />CONTRASEÑA PARA TU CUENTA</>}
        />
        <LoginChangeForm />
      </div>
    </main>

  )
}
