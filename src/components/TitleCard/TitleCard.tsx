import { FC, PropsWithChildren } from "react"
import styles from './TitleCard.module.css'

const TitleCard: FC<PropsWithChildren> = ({ children }) => {
    return (
        <article className={styles.card}>
            <h1>{children}</h1>
        </article>
    )
}

export default TitleCard