import { ContactsOutlined, DollarOutlined, FileDoneOutlined, HomeOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'

import styles from './Menu.module.css'
import Link from 'next/link'
const Menu = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link href='/'><span><HomeOutlined /></span>Resúmen</Link></li>
                <li><Link href='/usuarios'><span><UserOutlined/></span>Usuarios</Link></li>
                <li><Link href='/promotores'><span><ContactsOutlined /></span>Promotores</Link></li>
                <li><Link href='/promociones'><span><SolutionOutlined /></span>Promociones</Link></li>
                <li><Link href='/pagos'><span><DollarOutlined /></span>Pagos</Link></li>
                <li><Link href='/estado-de-cuenta'><span><FileDoneOutlined /></span>Estado de cuenta</Link></li>
                <li><Link href='/ajustes'><span><SettingOutlined /></span>Ajustes</Link></li>
            </ul>
        </nav>
    )
}

export default Menu