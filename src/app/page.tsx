import TitleCard from '@/components/TitleCard/TitleCard'
import styles from './home.module.css'
import EndLoading from '@/components/EndLoading/EndLoading'
import General from '@/components/stats/General/General'
import ProfileCard from '@/components/stats/ProfileCard/ProfileCard'
import { Col, Row } from 'antd'
import PromotersCard from '@/components/stats/Promoters/Promoters'
import UsersCard from '@/components/stats/users/UsersCard'
import CouponsCard from '@/components/stats/coupons/CouponsCard'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

/*
async function loadStats(cookie: any) {
  const token = cookie.value
  const allStats = await fetch(`${process.env.API_URL}/api/stats`, { 
    cache: 'no-store',
    headers:{
      'token': token
    }
  })
  const users_response = await allStats.json()

  return users_response
}
*/
export default function Home() {
  const cookieStore = cookies()
  console.log(cookieStore.get('auth_cookie'), "cokiedas")
  //const data = loadStats(cookieStore.get('auth_cookie'))
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
