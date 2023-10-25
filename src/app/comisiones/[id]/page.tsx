import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../promotores/[id]/Promoter.module.css'
import { Col, Row } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import DateItem from "@/components/utils/DateItem";

async function loadCommission({ params }: any) {
    const commissions = await fetch(`${process.env.API_URL}/api/commissions/${params.id}`, { cache: 'no-store' })
    const orders_response = await commissions.json()

    return {
        commission: orders_response.user
    }
}

export default async function Commission(props: any) {
    const { commission }: any = await loadCommission(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <center>
                    <h1 className={styles.custom_title}>Comisión del usuario: <strong></strong></h1>
                </center>
            </CustomCard>
            <br />
            <CustomCard>
                <div className={styles.card_content}>
                    <Subtitle>INFORMACIÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Número de pedido</strong></p>
                                   
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Cantidad</strong></p>
                                  
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de pago</strong></p>
                                   
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Estatus del pedido</strong></p>
                                    
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={commission.created_at} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={commission.updated_at} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>DIRECCIÓN DE FACTURACIÓN</Subtitle>
                    <hr />
                </div>
            </CustomCard>
            <br />
            <br />
        </main>

    )
}
