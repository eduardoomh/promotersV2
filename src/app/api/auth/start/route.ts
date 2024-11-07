import { validateEmail } from '@/utils/isValidEmail'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const body = await req.json()
        const { name, email, password, confirm_password, role } = body

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

        //cambiar a prisma
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

        // Crear nuevo usuario usando Prisma
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPassword,
                made_by_id: null,
            },
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