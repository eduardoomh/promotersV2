import { Avatar } from "antd"
import { FC, PropsWithChildren } from "react"
import styles from './AvatarUser.module.css'

interface props{
    letter: string;
    size?: 'default' | 'large' | 'small',
    align?: 'vertical' | 'horizontal';
    color?: string;
}
const AvatarUser:FC<PropsWithChildren<props>> = ({
    children, letter, size = 'default', align = 'horizontal', color}) => {
    return (
        <section className={`${styles.content} ${align === 'horizontal' ? '' : styles.content_vertical}`}>
            <Avatar
                style={{
                    backgroundColor: color ? color : '#EC1912',
                    verticalAlign: 'middle',
                    marginRight: '0.4rem'
                }}
                size={size}
           >{letter}</Avatar> <p className={align === 'vertical' ? styles.text_vertical :styles.text}>{children}</p>
        </section>
    )
}

export default AvatarUser