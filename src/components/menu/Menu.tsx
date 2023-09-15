'use client'
import { usePathname } from 'next/navigation'
import { ContactsOutlined, DollarOutlined, FileDoneOutlined, HomeOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Menu.module.css'
import Link from '../CustomLink/CustomLink'
const Menu = () => {
    const pathname = usePathname()
    
    const isActive = (path: string) =>{
        return pathname === path
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href='/' className={isActive('/') ? styles.active_menu : ''}>
                        <span><HomeOutlined /></span>Resúmen
                        </Link>
                </li>
                <li>
                    <Link href='/usuarios' className={isActive('/usuarios') ? styles.active_menu : ''}>
                        <span><UserOutlined /></span>Usuarios
                        </Link>
                </li>
                <li>
                    <Link href='/promotores' className={isActive('/promotores') ? styles.active_menu : ''}>
                        <span><ContactsOutlined /></span>Promotores
                    </Link>
                </li>
                <li>
                    <Link href='/promociones' className={isActive('/promociones') ? styles.active_menu : ''}>
                        <span><SolutionOutlined /></span>Promociones
                        </Link>
                </li>
                <li>
                    <Link href='/pagos' className={isActive('/pagos') ? styles.active_menu : ''}>
                        <span><DollarOutlined /></span>Pagos</Link>
                </li>
                <li>
                    <Link href='/estado-de-cuenta' className={isActive('/estado-de-cuenta') ? styles.active_menu : ''}>
                        <span><FileDoneOutlined /></span>Estado de cuenta
                        </Link>
                </li>
                <li>
                    <Link href='/ajustes' className={isActive('/ajustes') ? styles.active_menu : ''}>
                        <span><SettingOutlined /></span>Ajustes
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu