'use client'
import { GlobalContext } from "@/context/globalContext"
import { useContext, useEffect } from "react"

const EndLoading = () =>{
    const {endLoading} = useContext(GlobalContext)

    useEffect(() =>{
        endLoading()
    },[])
    return ''
}

export default EndLoading