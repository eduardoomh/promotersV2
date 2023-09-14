import { FC, PropsWithChildren } from "react"
import styles from './Button.module.css'

interface props {
    onClick?: () => void;
}
const CustomButton: FC<PropsWithChildren<props>> = ({ children, onClick }) => {
    return (
        <button
            className={`bg-chamosa-red ${styles.button}`}
            onClick={onClick}
            >
            {children}
        </button>
    )
}

export default CustomButton