import { validateEmail } from '@/utils/isValidEmail'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const body = await req.json()
        const { name, email, password, confirm_password, role } = body

        const cookieStore = cookies()
        const auth_cookie: any = cookieStore.get('auth_cookie')

        if (!auth_cookie.value) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(auth_cookie.value, 'secretch@mos@S48=ov6.TD^q8F')
        //@ts-ignore
        const { data } = IsTokenValid

        //validar campos enviados
        if (!email || !password || !confirm_password) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }
        if (!validateEmail(email)) {
            return NextResponse.json({
                message: messages.error.emailNotValid
            }, {
                status: 400
            })
        }

        if (password !== confirm_password) {
            return NextResponse.json({
                message: messages.error.passwordNotMatch
            }, {
                status: 400
            })
        }

        const userFind = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (userFind) {
            return NextResponse.json({
                message: messages.error.emailExist
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPassword,
                made_by_id: data.id,
            },
            include: {
                made_by: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            }
        })

        //@ts-ignore
        const { password: passw, ...rest } = newUser

        const response = NextResponse.json({
            newUser: rest,
            message: messages.success.userCreated
        }, {
            status: 200
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