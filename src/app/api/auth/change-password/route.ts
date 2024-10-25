import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

interface BodyProps {
    newPassword: string
    confirmPassword: string
}

export async function POST(req: NextRequest) {
    try {
        const body: BodyProps = await req.json()
        const { newPassword, confirmPassword } = body

        if (!newPassword || !confirmPassword) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }
        const prisma = new PrismaClient()

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
            //@ts-ignore
            const { data } = IsTokenValid

            const userFind = await prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            })

            if (!userFind) {
                return NextResponse.json({
                    message: messages.error.userNotFound
                }, {
                    status: 400
                })
            }
            if (newPassword !== confirmPassword) {
                return NextResponse.json({
                    message: messages.error.passwordNotMatch
                }, {
                    status: 400
                })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await prisma.user.update({
                where: {
                    id: userFind.id,
                },
                data: {
                    password: hashedPassword,
                },
            })

            return NextResponse.json({
                message: messages.success.passwordChanged
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