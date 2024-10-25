import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { arrayToString, stringToArray } from '../../../utils/arraysToString';

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const body = await req.json()
        const { new_commission } = body

        const { 
            user, promoter, coupon, earnings: { type, amount }, coupon: { id: couponId, code, products } 
        } = new_commission

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
            !user || !promoter || !coupon || !promoter
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

        const commissionCreated = await prisma.commission.create({
            data: {
                user: {
                    connect: { id: user },
                },
                promoter: {
                    connect: { id: promoter },
                },
                coupon: {
                    create: {
                        code,
                        coupon_id: `${couponId}`,
                        products: arrayToString(products),
                    },
                },
                earning_amount: amount,
                earning_type: type,
                made_by: {
                    connect: { id: data.id },
                },
            },
            include: {
                user: true,
                promoter: true,
                coupon: true,
                made_by: true,
            }
        });

        const response = NextResponse.json({
            commission: {
                ...commissionCreated,
                coupon: {
                    ...commissionCreated.coupon,
                    products: stringToArray(commissionCreated.coupon.products)
                }
            },
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
        const commissions = await prisma.commission.findMany({
            include: {
                user: true,
                promoter: true,
                coupon: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        const response = NextResponse.json({
            commissions,
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