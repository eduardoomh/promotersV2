import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'
import { chamosa_mail } from '@/components/email/chamosa_mail'
import { PrismaClient } from '@prisma/client'

const resend = new Resend(process.env.RESEND_SECRET_KEY)

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const body: { email: string } = await req.json()
        const { email } = body

        const userFind = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.userNotFound
            }, {
                status: 400
            })
        }

        const tokenData = {
            email: userFind.email,
            userId: userFind.id
        }

        const token = jwt.sign({ data: tokenData }, 'secretch@mos@S48=ov6.TD^q8F', {
            expiresIn: 86400
        })

        const forgetUrl = `${process.env.API_URL}/change-password?token=${token}`
        const prod_url = `${process.env.API_URL}`

        //@ts-ignore
        await resend.emails.send({
            from: 'promotores@chamosa.jesusmh.com',
            to: email,
            subject: 'Cambio de contraseña - Chamosa Promotores',
            html: chamosa_mail(forgetUrl, prod_url, email)
        })

        return NextResponse.json({
            message: messages.success.emailSent,
        }, {
            status: 200
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        }, {
            status: 500
        })
    }
}
