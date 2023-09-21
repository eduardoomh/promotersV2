import EndLoading from "@/components/EndLoading/EndLoading";
import styles from './Promoter.module.css'
import TitleCard from "@/components/TitleCard/TitleCard";
import TitleReturn from "@/components/utils/TitleBack";
import { Col, Row } from "antd";
import RoleTag from "@/components/utils/RoleTag";
import DateItem from "@/components/utils/DateItem";
import AvatarUser from "@/components/stats/AvatarUser/AvatarUser";
import EmptyImg from "@/components/EmptyImg/EmptyImg";

async function loadPromoter({ params }: any) {
    const promoters = await fetch(`${process.env.API_URL}/api/promoters/${params.id}`, { cache: 'no-store' })
    const promoters_response = await promoters.json()
    console.log(promoters_response, "los prmotores")

    return {
        promoter: promoters_response.user,
    }
}

export default async function Promotorer(props: any) {
    const { promoter }: any = await loadPromoter(props)

    return (
        <main className={styles.main}>
            <EndLoading />
            <TitleReturn path='/promotores'>
                <AvatarUser
                    letter={promoter.user?.name[0].toUpperCase()}
                    size='large'>{promoter.user.name}
                </AvatarUser>
            </TitleReturn>
            <br />
            <br />
            <Row gutter={[25, 25]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <article className={styles.info}>
                        <h2>DATOS PERSONALES</h2>
                        <p><strong>Correo</strong></p>
                        <p>{promoter.user.email}</p>
                        <p><strong>Tipo de usuario</strong></p>
                        <p><RoleTag role={promoter.user.role} /></p>
                        <p><strong>Teléfono de casa</strong></p>
                        <p>{promoter.personal_info.phone}</p>
                        <p><strong>Teléfono celular</strong></p>
                        <p>{promoter.personal_info.mobile_phone}</p>
                        <p><strong>RFC</strong></p>
                        <p>{promoter.personal_info.rfc}</p>
                    </article>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <article className={styles.info}>
                        <h2>DIRECCIÓN</h2>
                        <p><strong>Calle</strong></p>
                        <p>{promoter.address.street}</p>
                        <p><strong>Colonia</strong></p>
                        <p>{promoter.address.district}</p>
                        <p><strong>Estado</strong></p>
                        <p>{promoter.address.state}</p>
                        <p><strong>Código postal</strong></p>
                        <p>{promoter.address.postal_code}</p>
                        <p><strong>País</strong></p>
                        <p>{promoter.address.country}</p>
                    </article>
                </Col>
            </Row>
            <br />
            <br />
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <article className={styles.info}>
                        <h2>DATOS ADICIONALES</h2>
                        <p><strong>Saldo Abonado</strong></p>
                        <p>0</p>
                        <p><strong>Última modificación</strong></p>
                        <p><DateItem date={promoter.user.updated_at} /></p>
                        <p><strong>Fecha de creación</strong></p>
                        <p><DateItem date={promoter.user.created_at} /></p>
                    </article>
                </Col>
            </Row>
            <br />
            <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <article className={styles.card}>
                        <h2>PAGOS</h2>
                        <hr />
                        <section>
                            <EmptyImg />
                        </section>
                    </article>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <article className={styles.card}>
                        <h2>ESTADO DE CUENTA</h2>
                        <hr />
                        <section>
                            <EmptyImg />
                        </section>
                    </article>
                </Col>
            </Row>
            <br/>
        </main>

    )
}
