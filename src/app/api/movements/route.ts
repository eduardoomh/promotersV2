import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { new_movement } = body
        const { user, promoter, amount, type, description } = new_movement
        const prisma = new PrismaClient()

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
        if (
            !user || !promoter || !amount || !type || !description 
        ) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }

        const userFind = await prisma.user.findUnique({
            where:{
                id: user
            }
        })

        const promoterFind = await prisma.promoter.findFirst({
            where:{
                user_id: user
            }
        })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        if (!promoterFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }
        let updateBalance
        if (type === 'discount') {
            await prisma.promoter.update({
                where:{
                    id: promoterFind.id
                },
                data:{
                    balance: Number(promoterFind.balance) - Number(amount.toFixed(2)),
                    updated_at: new Date(),
                }
            })
            updateBalance = Number(promoterFind.balance) - Number(amount.toFixed(2))
        } else {
            await prisma.promoter.update({
                where:{
                    id: promoterFind.id
                },
                data:{
                    balance: Number(promoterFind.balance) + Number(amount.toFixed(2)),
                    updated_at: new Date(),
                }
            })
            updateBalance = Number(promoterFind.balance) + Number(amount.toFixed(2))
        }

        const movementCreated = await prisma.movement.create({
            data: {
                user: {
                    connect: { id: user },
                },
                promoter: {
                    connect: { id: promoterFind.id },
                },
                amount: Number(amount),
                type,
                description,
                before_mod: Number(promoterFind.balance),
                after_mod: updateBalance,
                made_by:{
                    connect: {
                        id: data.id
                    }
                }
            },
            include:{
                user: true,
                promoter: true
            }
        })

        const response = NextResponse.json({
            movement: movementCreated,
            message: messages.success.promoterCreated
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

export async function GET() {
    try {
        const prisma = new PrismaClient()
        const movements = await prisma.movement.findMany({
            include:{
                user: true,
                promoter: true
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        const response = NextResponse.json({
            movements,
            messages: messages.success.authorized
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