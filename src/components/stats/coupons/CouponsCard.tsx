import EmptyImg from '@/components/EmptyImg/EmptyImg'
import styles from './CouponsCard.module.css'

const CouponsCard = () =>{
    return(
        <article className={styles.general}>
        <h2>CUPONES RECIENTES</h2>
        <hr />
        <section className={styles.profile_section}>
            <div className={styles.profile_content}>
                <EmptyImg />
            </div>

        </section>
    </article>
    )
}

export default CouponsCard