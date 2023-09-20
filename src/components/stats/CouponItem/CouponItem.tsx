import { FC, PropsWithChildren } from "react"
import styles from './CouponsItem.module.css'

const CouponItem:FC<PropsWithChildren> = ({children}) =>{
    return (
        <section className={styles.content}>
            <p className={styles.text}>{children}</p>
        </section>
        
    )
}

export default CouponItem