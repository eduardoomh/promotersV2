import { FC, PropsWithChildren } from "react"
import styles from './FormCard.module.css'

interface props {
    title?: string | boolean
}

const FormCard: FC<PropsWithChildren<props>> = ({ children, title = false }) => {
    return (
        <div className={styles.form_card}>
            {
                title && (
                    <>
                        <h3>{title}</h3>
                        <hr />
                    </>
                )
            }
            <article>
                {children}
            </article>

        </div>
    )
}
export default FormCard