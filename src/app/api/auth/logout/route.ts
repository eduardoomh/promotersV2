import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        //@ts-ignore
        const cookie = req.cookies.get('auth_cookie')

        if (!cookie) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        const tokenBody = jwt.verify(cookie.value, 'secretch@mos@S48=ov6.TD^q8F')
        //@ts-ignore
        const { email } = tokenBody.data

        const userFind = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.emailExist
            }, {
                status: 400
            })
        }

        const token = jwt.sign({ data: userFind }, 'secretch@mos@S48=ov6.TD^q8F', {
            expiresIn: 0
        })

        const response = NextResponse.json({
            user: userFind,
            message: messages.success.logout
        }, {
            status: 200
        })

        response.cookies.set('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        }, {
            status: 500
        })
    }
}