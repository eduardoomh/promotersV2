'use client'
import { PlusCircleOutlined } from "@ant-design/icons";
import { Col } from "antd"
import { useRouter } from "next/navigation"
import { FC } from "react";

interface props {
    id: string;
}
const ActionsButton: FC<props> = ({ id }) => {
    const router = useRouter()

    const openActions = () => {
        router.push(`/promotores/${id}?actions=open`)
    }
    return (
        <Col span={24}>
            <article
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '3rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '6px',
                    backgroundColor: '#bdd3e7',
                    border: '1px solid #7cabd6',
                    cursor: 'pointer'
                }}
                onClick={openActions}
            >
                <p>Acciones {' '}<PlusCircleOutlined /></p>
            </article>
        </Col>
    )
}

export default ActionsButton