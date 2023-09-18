'use client'
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useContext } from "react"
import styles from './TitleBack.module.css'
import { GlobalContext } from "@/context/globalContext";

interface props {
    path: string;
}
const TitleReturn: FC<PropsWithChildren<props>> = ({ path, children }) => {
    const router = useRouter()
    const {startLoading} = useContext(GlobalContext)

    const goBack = () => {
        startLoading()
        router.push(path)
    }
    return (
        <section className={styles.return_container}>
            <ArrowLeftOutlined onClick={goBack} /><h1>{children}</h1>
        </section>
    )
}

export default TitleReturn