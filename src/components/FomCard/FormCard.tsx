import { FC, PropsWithChildren } from "react"
import styles from './FormCard.module.css'

interface props{
    title: string
}

const FormCard: FC<PropsWithChildren<props>> = ({children, title}) => {
    return (
        <div className={styles.form_card}>
            <h3>{title}</h3>
            <hr />
            <article>
                 {children}
            </article>
           
        </div>
    )
}
export default FormCard