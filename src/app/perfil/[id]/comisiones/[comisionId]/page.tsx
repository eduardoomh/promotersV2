import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../../../promotores/[id]/Promoter.module.css'
import { Col, Row } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import DateItem from "@/components/utils/DateItem";

async function loadCommission({ params }: any) {
    const commissions = await fetch(`${process.env.API_URL}/api/commissions/${params.comisionId}`, { cache: 'no-store' })
    const commissions_response = await commissions.json()
    //@ts-ignore
    const coupon = await fetch(`${process.env.API_URL}/api/coupons/${commissions_response.user.coupon.id}`, { cache: 'no-store' })
    const coupons_response = await coupon.json()

    return {
        commission: commissions_response.user,
        coupon: coupons_response.coupon
    }
}

export default async function Commission(props: any) {
    const { commission, coupon }: any = await loadCommission(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <center>
                    <h1 className={styles.custom_title}>Comisión del cupón:  <strong>{commission.coupon.code}</strong></h1>
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
                                    <p><strong>Usuario</strong></p>
                                    <p>{commission.user.name}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Correo</strong></p>
                                    <p>{commission.user.email}</p>

                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de pago</strong></p>
                                    <p>{commission.earning_type === 'fixed_price' ? 'Precio fijo' : 'porcentaje'}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Ganancia</strong></p>
                                    <p>{
                                        commission.earning_type === 'fixed_price' ?
                                            `$${commission.earning_amount} mxn` :
                                            `${commission.earning_amount}%`
                                    }
                                    </p>

                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={commission?.created_at} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={commission?.updated_at} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>CUPÓN ASIGNADO</Subtitle>
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <br />
                            <article
                                className={styles.product_card}
                                key={coupon.id}
                            >
                                <section className={styles.image_content}>
                                    <img
                                        src={coupon?.product_ids[0].images[0].src}
                                        alt={coupon?.product_ids[0].name}
                                        width={200}
                                        height={200}
                                    />
                                </section>
                                <section className={styles.content}>
                                    <p
                                        className={styles.content_title}>
                                        <strong>{coupon.code}</strong>
                                    </p>
                                    <p>
                                        <strong>Tipo de descuento:</strong> {coupon.discount_type === 'percentage' ? 'Porcentaje' : 'Precio fijo'}
                                    </p>
                                    <p>
                                        <strong>Cantidad:</strong> {coupon.amount}
                                    </p>
                                    <br />
                                </section>
                            </article>
                        </Col>
                    </Row>
                    <hr />
                    <br/>
                    <Subtitle>PRODUCTOS ASIGNADOS</Subtitle>
                    <Row gutter={[25, 25]}>
                        {
                            coupon.product_ids.map((el: any) => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} key={el.id}>
                                    <br />
                                    <article
                                        className={styles.product_card}
                                        key={coupon.id}
                                    >
                                        <section className={styles.image_content}>
                                            <img
                                                src={el.images[0].src}
                                                alt={el.name}
                                                width={200}
                                                height={200}
                                            />
                                        </section>
                                        <section className={styles.content}>
                                            <p
                                                className={styles.content_title}>
                                                <strong>{el.name}</strong>
                                            </p>
                                            <p className={styles.description} dangerouslySetInnerHTML={{ __html: el.short_description }}/>
                                            <br />
                                        </section>
                                    </article>
                                </Col>
                            ))
                        }

                    </Row>
                </div>
            </CustomCard>
            <br />
            <br />
        </main>

    )
}
