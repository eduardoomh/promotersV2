'use client'
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import React, { useContext, useEffect, useState } from "react"
import styles from './MainLayout.module.css'
import { FC, PropsWithChildren } from "react"
import LogoutButton from "../header/LogoutButton"
import { usePathname } from 'next/navigation'
import Menu from "../menu/Menu"
import Loader from "../Loader/Loader"
import { GlobalContext } from "@/context/globalContext"

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const {isMobileMenuOpen, openMobileMenu, closeMobileMenu} = useContext(GlobalContext)
    const pathname = usePathname()
    const shouldHideLayout = pathname === '/login' || pathname === '/change-password';

    return (
        <>
            {
                shouldHideLayout ? <>{children}</> : (
                    <div className={styles.container}>
                        <header className={`flex items-center justify-between ${styles.header}`}>
                            <section className='flex'>
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
                                <div className={`flex justify-center ${styles.logo_content}`}>
                                    <img src="/logo-Chamosa.png" alt="Mi Imagen" width={75} />
                                </div>
                                <p className={styles.title}>SISTEMA DE <br />PROMOTORES</p>
                            </section>
                            <section>
                                <LogoutButton />
                            </section>
                        </header>
                        <div className={styles.content}>
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
                                <Menu />
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