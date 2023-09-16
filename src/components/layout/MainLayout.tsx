'use client'
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import React, { useContext, useState } from "react"
import styles from './MainLayout.module.css'
import { FC, PropsWithChildren } from "react"
import LogoutButton from "../header/LogoutButton"
import { usePathname } from 'next/navigation'
import Menu from "../menu/Menu"
import Loader from "../Loader/Loader"
import { GlobalContext } from "@/context/globalContext"

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useContext(GlobalContext)
    const pathname = usePathname()
    const shouldHideLayout = pathname === '/login' || pathname === '/change-password';
    const [expand, setExpand] = useState(false)

    return (
        <>
            {
                shouldHideLayout ? <>{children}</> : (
                    <div className={styles.container}>
                        <header className={`flex items-center justify-between ${styles.header}`}>
                            <section className='flex'>
                                <div className={`${styles.hamburguer_web}`} onClick={() =>setExpand(!expand)}>
                                    <MenuOutlined />
                                </div>
                                <div
                                    className={styles.hamburguer}
                                    onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                                >
                                    {
                                        isMobileMenuOpen
                                            ? <CloseOutlined />
                                            : <MenuOutlined />
                                    }

                                </div>
                                <div className={`flex justify-center align-middle ${styles.logo_content}`}>
                                    <img src="/logo-Chamosa.png" alt="Mi Imagen" width={75} />
                                </div>
                              
                            </section>
                            <section>
                                <LogoutButton />
                            </section>
                        </header>
                        <div className={expand ? `${styles.content}` : `${styles.content} ${styles.content_no_expand}`}>
                            {
                                isMobileMenuOpen && <article className={styles.mobile_menu}>
                                    <section className={styles.logo_container}>
                                        <img src="/logo-Chamosa.png" alt="Mi Imagen" width={75} />
                                        <p className={styles.mobile_title}>SISTEMA DE <br />PROMOTORES</p>
                                    </section>
                                    <section className={styles.menu_container}>
                                        <Menu />
                                    </section>
                                </article>
                            }

                            <aside className={`bg-chamosa-red ${styles.aside}`}>
                                <Menu expand={expand} />
                            </aside>
                            <main className={styles.main}>

                                <Loader />


                                {children}
                            </main>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MainLayout