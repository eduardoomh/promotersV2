'use client'
import { usePathname } from 'next/navigation'
import { ContactsOutlined, DollarOutlined, FileDoneOutlined, HomeOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Menu.module.css'
import Link from '../CustomLink/CustomLink'
import { FC, useEffect } from 'react'

interface props {
    expand?: boolean
}
interface InlineStyles {
    no_expand: React.CSSProperties;
}


const inlineStyles: InlineStyles = {
    no_expand: {
        fontSize: '1.2rem',
        display: 'flex',
        justifyContent: 'center'
    }
}
const Menu: FC<props> = ({ expand = true }) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname === path
    }

    useEffect(() => {
    }, [expand])

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link 
                        href='/' 
                        className={isActive('/') ? styles.active_menu : ''}
                        disabled={pathname === '/'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <HomeOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Resúmen
                        </span> : ''
                        }
                    </Link>
                </li>
                <li>
                    <Link 
                        href='/usuarios' 
                        className={isActive('/usuarios') ? styles.active_menu : ''}
                        disabled={pathname === '/usuarios'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <UserOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Usuarios
                        </span> : ''
                        }

                    </Link>
                </li>
                <li>
                    <Link 
                        href='/promotores' 
                        className={isActive('/promotores') ? styles.active_menu : ''}
                        disabled={pathname === '/promotores'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <ContactsOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Promotores
                        </span> : ''
                        }

                    </Link>
                </li>
                <li>
                    <Link 
                        href='/cupones' 
                        className={isActive('/cupones') ? styles.active_menu : ''}
                        disabled={pathname === '/cupones'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <SolutionOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Cupones
                        </span> : ''
                        }
                    </Link>
                </li>
                <li>
                    <Link 
                        href='/comisiones' 
                        className={isActive('/comisiones') ? styles.active_menu : ''}
                        disabled={pathname === '/comisiones'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <DollarOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Comisiones
                        </span> : ''
                        }

                    </Link>
                </li>
                <li>
                    <Link 
                        href='/estado-de-cuenta' 
                        className={isActive('/estado-de-cuenta') ? styles.active_menu : ''}
                        disabled={pathname === '/estado-de-cuenta'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <FileDoneOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Estado de cuenta
                        </span> : ''
                        }
                    </Link>
                </li>
                <li>
                    <Link 
                        href='/ajustes' 
                        className={isActive('/ajustes') ? styles.active_menu : ''}
                        disabled={pathname === '/ajustes'}
                        >
                        <span
                            style={expand ? {} : inlineStyles.no_expand}>
                            <SettingOutlined />
                        </span>
                        {expand ? <span className={styles.menu_text}>
                            Ajustes
                        </span> : ''
                        }
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu