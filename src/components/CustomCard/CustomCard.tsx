import { FC, PropsWithChildren } from 'react'
import styles from './CustomCard.module.css'

const CustomCard: FC<PropsWithChildren> = ({children}) =>{
    return(
        //@ts-ignore
        <article className={styles.card}>
            {children}
        </article>
    )
}

export default CustomCard