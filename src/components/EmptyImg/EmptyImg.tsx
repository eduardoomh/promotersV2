import styles from './EmptyImg.module.css'

const EmptyImg = () => {
    return (
        <section className={styles.empty_container}>
            <img src='/empty_img.png' width={100} />
            <p>No hay información para mostrar</p>
        </section>
    )
}

export default EmptyImg