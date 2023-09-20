import CouponItem from '../CouponItem/CouponItem'
import styles from './CouponsCard.module.css'

const CouponsCard = () =>{
    return(
        <article className={styles.general}>
        <h2>CUPONES RECIENTES</h2>
        <hr />
        <section className={styles.profile_section}>
            <div className={styles.profile_content}>
                <CouponItem><strong>CHAFIME123 -</strong> 120MXN</CouponItem>
                <CouponItem><strong>TESTCOUPION23 -</strong> 120MXN</CouponItem>
                <CouponItem><strong>TEDTCOUPON3342 -</strong> 15%</CouponItem>
            </div>

        </section>
    </article>
    )
}

export default CouponsCard