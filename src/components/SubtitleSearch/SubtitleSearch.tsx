import { FC, PropsWithChildren } from "react"
import styles from './SubtitleSearch.module.css'

interface props {
    title: string
}
const SubitleSearch: FC<PropsWithChildren<props>> = ({ children, title }) => {
    return (
        <article className={styles.card}>
            <h1>{title}</h1>
            {children}
        </article>
    )
}

export default SubitleSearch