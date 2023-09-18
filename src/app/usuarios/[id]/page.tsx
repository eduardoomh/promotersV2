import TitleCard from "@/components/TitleCard/TitleCard"
import { ArrowLeftOutlined } from "@ant-design/icons"

/*
async function loadUser({params}: any) {
    console.log(params.id)
    const users = await fetch(`${process.env.API_URL}/api/users/${params.id}`, { cache: 'no-store' })
    const response = await users.json()
    return response.user
}
*/
export default async function Usuario(props: any) {
   // const user = await loadUser(props)
    return (
        <>
        <TitleCard><ArrowLeftOutlined />Usuario</TitleCard>
      
        </>
        
    )
}