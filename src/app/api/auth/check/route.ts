import { messages } from '@/utils/messages'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function GET() {
    try {
        const headersList = headers()
        const token = headersList.get('token')

        if (!token) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }
        try {
            const IsTokenValid = jwt.verify(token, 'secretch@mos@S48=ov6.TD^q8F')
            const prisma = new PrismaClient()

            //@ts-ignore
            const { data } = IsTokenValid
            const userFind = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            })

            if (!userFind) {
                return NextResponse.json({
                    message: messages.error.userNotFound
                }, {
                    status: 400
                })
            }
            return NextResponse.json({
                isAuthorized: true,
                message: messages.success.authorized,
                user: userFind
            }, {
                status: 200
            })

        } catch (error) {
            console.log(error)
            return NextResponse.json({
                message: messages.error.notValidToken, error
            }, {
                status: 400
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        }, {
            status: 500
        })
    }
}