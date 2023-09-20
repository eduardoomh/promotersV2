import styles from './General.module.css'

const General = () =>{
    return(
    <article className={styles.general}>
        <h2>RESÚMEN GENERAL</h2>
        <hr/>
        <section className={styles.stats_section}>
            <div className={styles.stats_item}>
                <h3>USUARIOS ACTIVOS</h3>
                <strong>5</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>PROMOTORES ACTIVOS</h3>
                <strong>5</strong>
            </div>
            <div className={styles.stats_item}> 
                <h3>ADMINISTRADORES</h3>
                <strong>5</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>CUPONES ACTIVOS</h3>
                <strong>5</strong>
            </div>
            <div className={styles.stats_item}>
                <h3>PAGOS REALIZADOS</h3>
                <strong>5</strong>
            </div>
        </section>
    </article>
    )
}

export default General