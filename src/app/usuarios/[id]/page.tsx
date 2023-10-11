import styles from './Usuario.module.css'
import EndLoading from "@/components/EndLoading/EndLoading"
import RoleTag from "@/components/utils/RoleTag"
import DateItem from "@/components/utils/DateItem"
import AvatarUser from '@/components/stats/AvatarUser/AvatarUser'
import CustomCard from '@/components/CustomCard/CustomCard'
import Subtitle from '@/components/Subtitle/Subtitle'
import { Col, Row } from 'antd'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import CustomAlert from '@/components/CustomAlert/CustomAlert'

async function loadUser({ params }: any) {
    const users = await fetch(`${process.env.API_URL}/api/users/${params.id}`, { cache: 'no-store' })
    const response = await users.json()
    return response.user
}

export default async function Usuario(props: any) {
    const user = await loadUser(props)
    return (
        <main className={styles.main}>
            <EndLoading />
            <CustomCard>
                <AvatarUser
                    letter={user?.name[0].toUpperCase()}
                    size='large'
                    font='big'
                    color="#176CBA"
                >{user.name}

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
                                    <p className={styles.text}>{user.email}</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Tipo de usuario</strong></p>
                                    <p><RoleTag role={user.role} /></p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Última modificación</strong></p>
                                    <p><DateItem date={user.updated_at} /></p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Cupones</strong></p>
                                    <p>5</p>
                                </div>
                            </article>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <article className={styles.card_container}>
                                <div className={styles.card_item}>
                                    <p><strong>Saldo Abonado</strong></p>
                                    <p>0</p>
                                </div>
                                <div className={styles.card_item}>
                                    <p><strong>Fecha de creación</strong></p>
                                    <p><DateItem date={user.created_at} /></p>
                                </div>
                            </article>
                        </Col>
                    </Row>
                    <hr />
                    {
                        user.role === 'promoter' && (
                            <Row gutter={[20, 20]}>
                                <Col span={24}>
                                    <CustomAlert title='PERFIL DE PROMOTOR'>
                                        A este usuario aún no se le ha creado un perfil de promotor.
                                    </CustomAlert>
                                </Col>
                            </Row>
                        )
                    }
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