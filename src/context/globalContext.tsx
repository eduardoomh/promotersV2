'use client'
import React, { createContext, useContext, useState } from 'react'

interface UserData {
    email: string | null
}
const userDataInit: UserData = {
    email: null
}

interface apiData {
    userData: UserData;
    isLoading: boolean;
    isMobileMenuOpen: boolean;
    updateUserData: (user: UserData) => void;
    startLoading: () => void,
    endLoading: () => void,
    closeMobileMenu: () => void
    openMobileMenu: () => void
}

// Empty Context Placeholder Variables
export const GlobalContext = createContext<apiData>({
    userData: userDataInit,
    isLoading: false,
    isMobileMenuOpen: false,
    updateUserData: () => {},
    startLoading: () => {},
    endLoading: () =>{},
    closeMobileMenu: () => {},
    openMobileMenu: () => {}
})

export const GlobalContextProvider = (props: any) => {
    // Storage User Information Variables
    const [userData, setUserData] = useState<UserData>(userDataInit)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const updateUserData = (user: UserData) =>{
        setUserData(user)
    }
    const startLoading = () =>{
        setIsLoading(true)
    }

    const endLoading = () =>{
        setIsLoading(false)
    }
    const closeMobileMenu = () =>{
        setIsMobileMenuOpen(false)
    }
    const openMobileMenu = () =>{
        setIsMobileMenuOpen(true)
    }

    return (
        <GlobalContext.Provider value={{
            userData, 
            updateUserData,
            isLoading,
            startLoading,
            endLoading,
            isMobileMenuOpen,
            closeMobileMenu,
            openMobileMenu
            }}>
        { props.children }
        </GlobalContext.Provider>
    )
}
