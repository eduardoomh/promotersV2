import { FC } from 'react'
import styles from './General.module.css'

interface props{
    stats: any
}
const General:FC<props> = ({stats}) =>{
    return(
    <article className={styles.general}>
        <h2>RESÚMEN GENERAL</h2>
        <hr/>
        <section className={styles.stats_section}>
            <div className={styles.stats_item}>
                <h3>USUARIOS ACTIVOS</h3>
                <strong>{stats.totalUsers}</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>PROMOTORES ACTIVOS</h3>
                <strong>{stats.promoter_count}</strong>
            </div>
            <div className={styles.stats_item}> 
                <h3>ADMINISTRADORES</h3>
                <strong>{stats.admin_count}</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>CUPONES ACTIVOS</h3>
                <strong>0</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>PAGOS REALIZADOS</h3>
                <strong>0</strong>
            </div>
        </section>
    </article>
    )
}

export default General