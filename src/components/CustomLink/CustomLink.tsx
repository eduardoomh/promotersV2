"use client";
import { GlobalContext } from "@/context/globalContext";
import NextLink from "next/link";
import { FC, PropsWithChildren, useContext } from "react";

interface props{
    href: any;
    className: any
}
const Link:FC<PropsWithChildren<props>> = ({href, children, className}) =>{
    const {closeMobileMenu} = useContext(GlobalContext)
    //const router = useRouter()
    const {startLoading} = useContext(GlobalContext)
    const onClick = () =>{
        startLoading()
        closeMobileMenu()
    }

    return <NextLink className={className} href={href} onClick={onClick}>{children}</NextLink>
}
export default Link;