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
import AvatarItem from '@/components/stats/AvatarItem/AvatarItem'
import UsersMadeBy from '@/components/tables/users/madeBy/UsersMadeBy'
import PromotersMadeBy from '@/components/tables/promoters/madeBy/PromotersMadeBy'
import UsersMobileMadeBy from '@/components/tables/users/madeBy/UsersMobileMadeBy'
import PromotersMobileMadeBy from '@/components/tables/promoters/madeBy/PromotersMobileMadeBy'

async function loadUser({ params }: any) {
    const users = await fetch(`${process.env.API_URL}/api/users/${params.id}`, { cache: 'no-store' })
    const response = await users.json()
    return { user: response.user, promoter: response.promoter, madeBy: response.user_stats }
}

export default async function Usuario(props: any) {
    const { user, promoter, madeBy } = await loadUser(props)
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
                        user.role === 'promoter' && !promoter && (
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
                {
                    user.role === 'admin' ? (
                        <>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <CustomCard>
                                    <article className={styles.card}>
                                        <h2>USUARIOS</h2>
                                        <hr />
                                        {
                                            madeBy && madeBy.users && madeBy.users.length > 0 ? (
                                                <>
                                                <br/>
                                                <div className={styles.mobile_users_table}>
                                                     <UsersMobileMadeBy users={madeBy.users} />
                                                </div>
                                                <div className={styles.web_users_table}>
                                                     <UsersMadeBy users={madeBy.users} />
                                                </div>
                                               
                                                </>
                                            ) : (
                                                <section>
                                                    <EmptyImg />
                                                </section>
                                            )
                                        }
                                    </article>
                                </CustomCard>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <CustomCard>
                                    <article className={styles.card}>
                                        <h2>PROMOTORES</h2>
                                        <hr />
                                        {
                                            madeBy && madeBy.promoters && madeBy.promoters.length > 0 ? (
                                                <>
                                                <br/>
                                                <div className={styles.mobile_users_table}>
                                                    <PromotersMobileMadeBy promoters={madeBy.promoters} />
                                                </div>
                                                <div className={styles.web_users_table}>
                                                    <PromotersMadeBy promoters={madeBy.promoters} />
                                                </div>
                                               
                                                </>
                                            ) : (
                                                <section>
                                                    <EmptyImg />
                                                </section>
                                            )
                                        }
                                    </article>
                                </CustomCard>
                            </Col>    
                        </>
                    ) : (
                        <>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <CustomCard>
                                    <article className={styles.card}>
                                        <h2>PERFIL PROMOTOR</h2>
                                        <hr />
                                        {
                                            promoter ? (
                                                <>
                                                    <br />
                                                    <AvatarItem
                                                        key={user._id}
                                                        letter={user.name[0].toUpperCase()}
                                                        user={user}
                                                        size='large'
                                                        color={'#0D709A'}
                                                        //@ts-ignore
                                                        url={`/promotores/${promoter._id}`}
                                                    />
                                                </>
                                            ) : (
                                                <section>
                                                    <EmptyImg />
                                                </section>
                                            )
                                        }
                                    </article>
                                </CustomCard>
                            </Col>
                        </>
                    )
                }

            </Row>
            <br />
        </main >

    )
}