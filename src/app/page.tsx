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

export default async function Home() {
  const cookieStore = cookies()
  console.log(cookieStore.get('auth_cookie'), "cokiedas")
  const data = await loadStats(cookieStore.get('auth_cookie'))
  console.log(data, "respp")
  return (
    <>
      <EndLoading />
      <TitleCard>BIENVENIDO DE VUELTA</TitleCard>
      <br/>
      <General stats={data.stats[0]} />
      <br/>
      <Row gutter={[20,20]}>
        <Col xs={24} sm={24} md={24} xl={12}> 
          <ProfileCard user={data.user[0]} stats={data.user[0]}/>
          <br/>
          <CouponsCard />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}> 
          <PromotersCard data={data.recent[0].recentUsers} />
          <br/>
          <UsersCard data={data.recent[0].recentPromoters} />
        </Col>
      </Row>
     
    </>

  )
}
