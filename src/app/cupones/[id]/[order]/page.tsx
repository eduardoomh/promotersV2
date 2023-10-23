import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../../promotores/[id]/Promoter.module.css'
import { Col, Row } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import DateItem from "@/components/utils/DateItem";

async function loadOrder({ params }: any) {
    const orders = await fetch(`${process.env.API_URL}/api/orders/${params.order}`, { cache: 'no-store' })
    const orders_response = await orders.json()

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
                    <Subtitle>INFORMACIÓN DEL PEDIDO</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Número de pedido</strong></p>
                                    <p>{order.number}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Cantidad</strong></p>
                                    <p>{order.total} {order.currency}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de pago</strong></p>
                                    <p>{order.payment_method_title}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Estatus del pedido</strong></p>
                                    <p>{order.status === 'processing' ? 'Procesando' : order.status}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={order.date_created} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={order.date_modified} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>DIRECCIÓN DE FACTURACIÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Nombre</strong></p>
                                    <p>{order.billing.first_name} {order.billing.last_name}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Teléfono</strong></p>
                                    <p>{order.billing.phone}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Correo</strong></p>
                                    <p>{order.billing.email}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Dirección</strong></p>
                                    <p>{order.billing.address_1}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Colonia</strong></p>
                                    <p>{order.billing.address_2}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Código postal</strong></p>
                                    <p>{order.billing.postcode}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Ciudad</strong></p>
                                    <p>{order.billing.city}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Estado</strong></p>
                                    <p>{order.billing.state}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>País</strong></p>
                                    <p>{order.billing.country}</p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>DIRECCIÓN DE ENVÍO</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Nombre</strong></p>
                                    <p>{order.shipping.first_name} {order.shipping.last_name}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Dirección</strong></p>
                                    <p>{order.shipping.address_1}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Código postal</strong></p>
                                    <p>{order.shipping.postcode}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Colonia</strong></p>
                                    <p>{order.shipping.address_2}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Ciudad</strong></p>
                                    <p>{order.shipping.city}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Estado</strong></p>
                                    <p>{order.shipping.state}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>País</strong></p>
                                    <p>{order.shipping.country}</p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>PRODUCTOS DEL PEDIDO</Subtitle>
                <hr />
                <Row gutter={[25, 25]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <br />
                        {
                            order.line_items.map((el: any) => (
                                <>
                                    <article className={styles.product_card} key={el.id}>
                                        <section className={styles.image_content}>
                                            <img
                                                src={el.image.src}
                                                alt={el.image.parent_name}
                                                width={200}
                                                height={200}
                                            />
                                        </section>
                                        <section className={styles.content}>
                                            <p
                                                className={styles.content_title}>
                                                <strong>{el.parent_name}</strong>
                                            </p>
                                            <p>{el.meta_data.map((cat: any) => {
                                                if (typeof cat.display_value === 'string') {
                                                    return <p key={cat.id}> {cat.display_key}: {cat.display_value}</p>
                                                }
                                            })}</p>
                                            <br />
                                        </section>
                                    </article>
                                </>
                            ))
                        }
                    </Col>
                </Row>
                </div>
            </CustomCard>
            <br />
            <br/>
        </main>

    )
}
