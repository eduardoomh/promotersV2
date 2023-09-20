import { Avatar } from "antd"
import { FC, PropsWithChildren } from "react"
import styles from './AvatarUser.module.css'

interface props{
    letter: string;
    size?: 'default' | 'large' | 'small'
}
const AvatarUser:FC<PropsWithChildren<props>> = ({children, letter, size = 'default'}) => {
    return (
        <section className={styles.content}>
            <Avatar
                style={{
                    backgroundColor: '#EC1912',
                    verticalAlign: 'middle',
                    marginRight: '0.4rem'
                }}
                size={size}
           >{letter}</Avatar> <p className={styles.text}>{children}</p>
        </section>
    )
}

export default AvatarUser