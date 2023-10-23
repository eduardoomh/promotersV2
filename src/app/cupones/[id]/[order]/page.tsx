import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../../promotores/[id]/Promoter.module.css'
import { Col, Row } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import EmptyImg from "@/components/EmptyImg/EmptyImg";

async function loadOrder({ params }: any) {
    const orders = await fetch(`${process.env.API_URL}/api/orders/${params.order}`, { cache: 'no-store' })
    const orders_response = await orders.json()
  console.log(orders_response)

    return {
        order: orders_response.coupon
    }
}

export default async function Order(props: any) {
    const { order }: any = await loadOrder(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <center>
                    <h1 className={styles.custom_title}>Pedido: <strong>#{order.id}</strong></h1>
                </center>
            </CustomCard>
            <br />
            <CustomCard>
                <div className={styles.card_content}>
                    <Subtitle>INFORMACIÓN DEL CUPÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            
                        </Col>
                    </Row>
                    <Subtitle>PRODUCTOS DEL CUPÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <br />
                           
                        </Col>
                    </Row>
                </div>
            </CustomCard>
            <br />
            <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <CustomCard>
                        <article className={styles.card}>
                            <h2>PROMOTORES ASIGNADOS</h2>
                            <hr />
                            <section>
                                <EmptyImg />
                            </section>
                        </article>
                    </CustomCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    
                </Col>
                
            </Row>
            <br />
        </main>

    )
}
