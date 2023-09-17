import { FC, PropsWithChildren } from "react"
import styles from './SubtitleCard.module.css'

const SubitleCard: FC<PropsWithChildren> = ({ children }) => {
    return (
        <article className={styles.card}>
            <h2>{children}</h2>
        </article>
    )
}

export default SubitleCard