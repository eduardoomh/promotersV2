import { Avatar } from "antd"
import { FC, PropsWithChildren, useContext } from "react"
import styles from './AvatarItem.module.css'
import { IUserSchema } from "@/models/User";
import { RightCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/globalContext";

interface props {
    letter: string;
    size?: 'default' | 'large' | 'small',
    color?: string;
    user: IUserSchema
    url: string
}
const AvatarItem: FC<props> = ({
    letter, size = 'default', color, user, url }) => {
        const router = useRouter()
        const { startLoading } = useContext(GlobalContext)

        const goToUser = (url: string) => {
            startLoading()
            router.push(url)
        }
        
    return (
        <section className={styles.content} onClick={() => goToUser(url)}>
            <section className={styles.content_left}>
                <div className={styles.content_avatar}>
                    <Avatar
                        style={{
                            backgroundColor: color ? color : '#EC1912',
                            verticalAlign: 'middle',
                            marginRight: '0.4rem'
                        }}
                        size={size}
                    >{letter}
                    </Avatar>
                </div>
                <div>
                    <p>
                        <strong>{user.name}</strong>
                        <br />
                        {user.email}
                    </p>
                </div>
            </section>
            <div className={styles.icon_container}>
                <RightCircleOutlined className={styles.icon} />
            </div>
        </section>
    )
}

export default AvatarItem