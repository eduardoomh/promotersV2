import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../promotores/[id]/Promoter.module.css'
import { Col, Row, Tag } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import DateItem from "@/components/utils/DateItem";
import EmptyImg from "@/components/EmptyImg/EmptyImg";
import OrdersTable from "@/components/tables/orders/OrdersTable";
import CommissionsTable from "@/components/tables/commissions/madeBy/CommissionsMadeBy";

async function loadCupon({ params }: any) {
    const coupons = await fetch(`${process.env.API_URL}/api/coupons/${params.id}`, { cache: 'no-store' })
    const orders = await fetch(`${process.env.API_URL}/api/orders`, { cache: 'no-store' })
    const coupons_response = await coupons.json()
    const orders_response = await orders.json()


    return {
        coupon: coupons_response.coupon,
        orders: orders_response.orders.filter((order: any) => {
            return order.coupon_lines.filter((coupon: any) => coupon.code === coupons_response.code);
        }),
        commissions: coupons_response.commissions
    }
}

export default async function Cupon(props: any) {
    const { coupon, orders, commissions }: any = await loadCupon(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <center>
                    <h1 className={styles.custom_title}>Cupón: <strong>{coupon?.code}</strong></h1>
                </center>
            </CustomCard>
            <br />
            <CustomCard>
                <div className={styles.card_content}>
                    <Subtitle>INFORMACIÓN DEL CUPÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Código</strong></p>
                                    <p>{coupon?.code}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Cantidad</strong></p>
                                    <p>{coupon?.amount}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de descuento</strong></p>
                                    <p>{coupon?.discount_type === 'percentage' ? 'Porcentaje' : 'Precio fijo'}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Estatus</strong></p>
                                    <p>{coupon?.status === 'publish' ? 'Publicado' : coupon?.status}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Veces usado</strong></p>
                                    <p>{coupon?.usage_count}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={coupon?.date_created} /></p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={coupon?.date_modified} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de expiración</strong></p>
                                    <p>{coupon?.date_expires === null ? 'Sin fecha de expiración' : coupon?.date_expires}</p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>PRODUCTOS DEL CUPÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <br />
                            {
                                coupon?.product_ids.map((el: any) => (
                                    <>
                                        <article className={styles.product_card} key={el.id}>
                                            <section className={styles.image_content}>
                                                <img
                                                    src={el.images[0].src}
                                                    alt={el.images[0].name}
                                                    width={200}
                                                    height={200}
                                                />
                                            </section>
                                            <section className={styles.content}>
                                                <p
                                                    className={styles.content_title}>
                                                    <a href={el.permalink} target="_blank">
                                                        <strong>{el.name}</strong>
                                                    </a>

                                                </p>
                                                <p>{el.categories.map((cat: any) => (<span key={cat.id}> <Tag color="#f50">{cat.name}</Tag></span>))}</p>
                                                <br />
                                                <p className={styles.description} dangerouslySetInnerHTML={{ __html: el.short_description }} />
                                            </section>
                                        </article>
                                        <br />
                                    </>
                                ))
                            }

                        </Col>
                    </Row>
                </div>
            </CustomCard>
            <br />
            <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <CustomCard>
                        <article className={styles.card}>
                            <h2>COMISIONES QUE USAN EL CUPÓN</h2>
                            <hr />
                            <section>
                                {
                                    commissions?.length > 0 ?
                                        <CommissionsTable commissions={commissions} /> :
                                        <EmptyImg />
                                }
                            </section>
                        </article>
                    </CustomCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <CustomCard>
                        <article className={styles.card}>
                            <h2>PEDIDOS CON EL CUPÓN {coupon?.code?.toUpperCase()}</h2>
                            <hr />
                            <section>
                            {
                                    orders?.length > 0 ?
                                        <OrdersTable orders={orders} couponId={coupon?.id} /> :
                                        <EmptyImg />
                                }
                            </section>
                        </article>
                    </CustomCard>
                </Col>

            </Row>
            <br />
        </main>

    )
}
