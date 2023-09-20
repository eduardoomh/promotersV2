import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email/EmailComponent'
import { chamosa_mail } from '@/components/email/chamosa_mail'

const resend = new Resend('re_ALvhXBZJ_ABRwANWRg5Tw6XzuNNjydDe8')

export async function POST(req: NextRequest) {
    try{
        const body: {email: string} = await req.json()
        const {email} = body
        await connectMongoDB()

        const userFind = await User.findOne({email})

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.userNotFound
            }, {
                status: 400
            })
        }

        const tokenData = {
            email: userFind.email,
            userId: userFind._id
        }

        const token = jwt.sign({data: tokenData}, 'secretch@mos@',{
            expiresIn: 86400
        })

        const forgetUrl = `${process.env.API_URL}/change-password?token=${token}`
        const prod_url = `${process.env.API_URL}`

        //@ts-ignore
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Cambio de contraseña - Chamosa Promotores',
            html: chamosa_mail(forgetUrl, prod_url, email)
        })

        return NextResponse.json({
            message: messages.success.emailSent,
        },{
            status: 200
        })


    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}

function Emailcomponent(arg0: { buttonUrl: string }): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactNode {
    throw new Error('Function not implemented.')
}
