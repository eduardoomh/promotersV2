'use client'
import React, { createContext, useState } from 'react'

interface UserData {
    email: string | null
}
const userDataInit: UserData = {
    email: null
}

interface apiData {
    userData: UserData;
    updateUserData: (user: UserData) => void;
}

// Empty Context Placeholder Variables
export const GlobalContext = createContext<apiData>({
    userData: userDataInit,
    updateUserData: () => {}
})

export const GlobalContextProvider = (props: any) => {
    // Storage User Information Variables
    const [userData, setUserData] = useState<UserData>(userDataInit)

    const updateUserData = (user: UserData) =>{
        setUserData(user)
    }
    return (
        <GlobalContext.Provider value={{userData, updateUserData}}>
        { props.children }
        </GlobalContext.Provider>
    )
}
