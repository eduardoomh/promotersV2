import TitleCard from '@/components/TitleCard/TitleCard'
import styles from './home.module.css'
import EndLoading from '@/components/EndLoading/EndLoading'
import General from '@/components/stats/General/General'
import ProfileCard from '@/components/stats/ProfileCard/ProfileCard'
import { Col, Row } from 'antd'
import PromotersCard from '@/components/stats/Promoters/Promoters'
import UsersCard from '@/components/stats/users/UsersCard'
import CouponsCard from '@/components/stats/coupons/CouponsCard'

export default function Home() {
  return (
    <>
      <EndLoading />
      <TitleCard>BIENVENIDO DE VUELTA</TitleCard>
      <br/>
      <General />
      <br/>
      <Row gutter={[20,20]}>
        <Col xs={24} sm={24} md={24} xl={12}> 
          <ProfileCard />
          <br/>
          <CouponsCard />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}> 
          <PromotersCard />
          <br/>
          <UsersCard />
        </Col>
      </Row>
     
    </>

  )
}
