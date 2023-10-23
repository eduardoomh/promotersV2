import EndLoading from "@/components/EndLoading/EndLoading";
import styles from './Promoter.module.css'
import { Col, Row } from "antd";
import RoleTag from "@/components/utils/RoleTag";
import DateItem from "@/components/utils/DateItem";
import AvatarUser from "@/components/stats/AvatarUser/AvatarUser";
import EmptyImg from "@/components/EmptyImg/EmptyImg";
import CustomCard from "@/components/CustomCard/CustomCard";
import Subtitle from "@/components/Subtitle/Subtitle";
import { getStateCountry } from "@/utils/countries";

async function loadPromoter({ params }: any) {
    const promoters = await fetch(`${process.env.API_URL}/api/promoters/${params.id}`, { cache: 'no-store' })
    const promoters_response = await promoters.json()

    return {
        promoter: promoters_response.user,
    }
}

export default async function Promotorer(props: any) {
    const { promoter }: any = await loadPromoter(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <AvatarUser
                    letter={promoter.user?.name[0].toUpperCase()}
                    size='large'
                    font='big'
                    color="#176CBA"
                >{promoter.user.name}
                </AvatarUser>
            </CustomCard>
            <br />
            <CustomCard>
                <div className={styles.card_content}>
                    <Subtitle>DATOS PERSONALES</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Correo</strong></p>
                                    <p>{promoter.user.email}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de usuario</strong></p>
                                    <p><RoleTag role={promoter.user.role} /></p>
                                </div>

                                <div className={styles.card_item}>
                                    <p><strong>Teléfono de casa</strong></p>
                                    <p>{promoter.personal_info.phone}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Teléfono celular</strong></p>
                                    <p>{promoter.personal_info.mobile_phone}</p>
                                </div>

                                <div className={styles.card_item}>
                                    <p><strong>RFC</strong></p>
                                    <p>{promoter.personal_info.rfc}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={promoter.user.updated_at} /></p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Saldo Abonado</strong></p>
                                    <p>${promoter.balance} MXN</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={promoter.user.created_at} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <Subtitle>DIRECCIÓN</Subtitle>
                    <hr />
                    <Row gutter={[25, 25]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Calle</strong></p>
                                    <p>{promoter.address.street}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Colonia</strong></p>
                                    <p>{promoter.address.district}</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>

                                <div className={styles.card_item}>
                                    <p><strong>Código postal</strong></p>
                                    <p>{promoter.address.postal_code}</p>

                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>País</strong></p>
                                    <p className={styles.text}>
                                        <img src="/countries/MX.svg" width={16} height={16} />
                                        {promoter.address.country === 'US' ? 'Estados Unidos' : 'México'}
                                    </p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Ciudad</strong></p>
                                    <p>{promoter.address.city}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Estado</strong></p>
                                    <p>{getStateCountry(promoter.address.state, promoter.address.country)}</p>
                                </div>

                            </article>
                        </Col>
                    </Row>
                </div>
            </CustomCard>
            <br />
            <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <CustomCard>
                        <article className={styles.card}>
                            <h2>PAGOS</h2>
                            <hr />
                            <section>
                                <EmptyImg />
                            </section>
                        </article>
                    </CustomCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <CustomCard>
                        <article className={styles.card}>
                            <h2>ESTADO DE CUENTA</h2>
                            <hr />
                            <section>
                                <EmptyImg />
                            </section>
                        </article>
                    </CustomCard>
                </Col>
            </Row>
            <br />
        </main>

    )
}
