import { FC, ReactNode } from 'react';
import styles from './LoginSquare.module.css'

interface props{
    title: ReactNode;
    subtitle: ReactNode;
}
const LoginSquare:FC<props> = ({title, subtitle}) => {
    return (
        <div className={`${styles.left_square}`}>
            <div className={`bg-chamosa-red text-white ${styles.square_item_1}`}>
                <h1>{title}</h1>
            </div>
            <div className={`${styles.square_item_2}`}>
                <img src="/logo-Chamosa.png" alt="Mi Imagen" width={120} />
                <p>CHAMARRA.COM SA DE CV</p>
            </div>
            <div className={`${styles.square_item_3}`}>
                <p>{subtitle}</p>
            </div>
            <div className={`bg-chamosa-red text-white ${styles.square_item_4}`}>
                <p>PROBLEMAS?</p>
                <p>CONTÁCTANOS:</p>
                <p>SHOP@CHAMARRA.COM</p>
            </div>
        </div>
    )
}

export default LoginSquare