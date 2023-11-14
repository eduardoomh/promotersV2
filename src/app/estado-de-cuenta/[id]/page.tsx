import EndLoading from "@/components/EndLoading/EndLoading";
import styles from '../../promotores/[id]/Promoter.module.css'
import { Col, Row } from "antd";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import DateItem from "@/components/utils/DateItem";
import AvatarItem from "@/components/stats/AvatarItem/AvatarItem";
import EmptyImg from "@/components/EmptyImg/EmptyImg";

async function loadMovement({ params }: any) {
    const movement = await fetch(`${process.env.API_URL}/api/movements/${params.id}`, { cache: 'no-store' })
    const movement_response = await movement.json()

    return {
        movement: movement_response?.user,
    }
}

export default async function Commission(props: any) {
    const { movement }: any = await loadMovement(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <center>
                    <h1 className={styles.custom_title}>Movimiento</h1>
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
                                    <p>{movement?.user?.name}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Correo</strong></p>
                                    <p>{movement?.user?.email}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Concepto del pago</strong></p>
                                    <p>{movement.description}</p>

                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Cantidad</strong></p>
                                    <p>{movement.amount}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Saldo anterior</strong></p>
                                    <p>{movement.security.before_mod}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Saldo posterior</strong></p>
                                    <p>{movement.security.after_mod}</p>

                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={movement?.created_at} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={movement?.updated_at} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>PERFIL DEL PROMOTOR</Subtitle>
                    <hr />
                    <article className={styles.card}>
                        {
                            movement.promoter ? (
                                <>
                                    <br />
                                    <AvatarItem
                                        key={movement?.user._id}
                                        letter={movement?.user?.name[0].toUpperCase()}
                                        user={movement?.user}
                                        size='large'
                                        color={'#0D709A'}
                                        //@ts-ignore
                                        url={`/promotores/${movement.promoter._id}`}
                                    />
                                </>
                            ) : (
                                <section>
                                    <EmptyImg />
                                </section>
                            )
                        }
                    </article>
                </div>
            </CustomCard>
            <br />
        </main>

    )
}
