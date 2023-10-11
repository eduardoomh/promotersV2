import { FC, PropsWithChildren } from "react"
import styles from './Subtitle.module.css'

const Subtitle: FC<PropsWithChildren> = ({ children }) => {
    return (
        <h2 className={styles.h2} >
            {children}
        </h2>
    )
}
export default Subtitle