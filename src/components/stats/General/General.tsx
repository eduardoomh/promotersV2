import { FC } from 'react'
import { ContactsOutlined, DollarOutlined, FileDoneOutlined, HomeOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import styles from './General.module.css'

interface props {
    stats: any
}
const General: FC<props> = ({ stats }) => {
    return (
        <article className={styles.general}>
            <h2>RESÚMEN GENERAL</h2>
            <hr />
            <section className={styles.stats_section}>
                <div className={styles.stats_item}>
                    <UserOutlined className={styles.icon} />
                    <h3>USUARIOS</h3>
                    <strong>{stats.totalUsers}</strong>
                </div>
                <div className={styles.stats_item}>
                    <ContactsOutlined className={styles.icon}/>
                    <h3>PROMOTORES</h3>
                    <strong>{stats.promoter_count}</strong>
                </div>
                <div className={styles.stats_item}>
                    <UserOutlined className={styles.icon} />
                    <h3>ADMINISTRADORES</h3>
                    <strong>{stats.admin_count}</strong>
                </div>
                <div className={styles.stats_item}>
                    <SolutionOutlined className={styles.icon} />
                    <h3>CUPONES</h3>
                    <strong>0</strong>
                </div>
                <div className={styles.stats_item}>
                    <DollarOutlined className={styles.icon} />
                    <h3>PAGOS</h3>
                    <strong>0</strong>
                </div>
            </section>
        </article>
    )
}

export default General