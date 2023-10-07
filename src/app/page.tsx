import TitleCard from '@/components/TitleCard/TitleCard'
import EndLoading from '@/components/EndLoading/EndLoading'
import General from '@/components/stats/General/General'
import ProfileCard from '@/components/stats/ProfileCard/ProfileCard'
import { Col, Row } from 'antd'
import PromotersCard from '@/components/stats/Promoters/Promoters'
import UsersCard from '@/components/stats/users/UsersCard'
import CouponsCard from '@/components/stats/coupons/CouponsCard'
import { cookies } from 'next/headers'
import styles from  './home.module.css'

async function loadStats(cookie: any) {
  const token = cookie.value
  const allStats = await fetch(`${process.env.API_URL}/api/stats`, {
    cache: 'no-store',
    headers: {
      'token': token
    }
  })
  const users_response = await allStats.json()

  return users_response
}

export default async function Home() {
  const cookieStore = cookies()
  const data = await loadStats(cookieStore.get('auth_cookie'))

  console.log(data.recent[0].recentUsers, data.recent[0].recentPromoters, "data")
  return (
    <>
      <EndLoading />
      <Row gutter={[20, 20]} className={styles.scroll_view}>
        <Col span={24}> 
        <General stats={data.stats[0]} />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <ProfileCard user={data.user[0]} stats={data.user[0]} />
          <br />
          <CouponsCard />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <PromotersCard data={data.recent[0].recentUsers} user={true} />
          <br />
          <PromotersCard data={data.recent[0].recentPromoters} />
        </Col>
      </Row>
    </>

  )
}
