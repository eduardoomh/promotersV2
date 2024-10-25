import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/promoters/')[1]

        const response = NextResponse.json({
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

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/profile/')[1]
        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })

        if(!user){
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

          const promoter = await prisma.promoter.findFirst({
            where: {
                user_id: id,
            },
            include:{
                user: true,               
                address: true, 
                user_info: true,  
                made_by: true, 
            }
        })

          const commissions = await prisma.commission.findMany({
            where: {
                user_id: id,
            },
            include:{
                user: true,    
                promoter: true,           
                made_by: true, 
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        const movements = await prisma.movement.findMany({
            where: {
                user_id: id,
            },
            include:{
                user: true,    
                promoter: true,           
                made_by: true, 
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        if(!promoter){
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            promoter: promoter,
            movements,
            commissions,
            messages: messages.success.authorized
        }, {
            status: 200
        })
        return response
    } catch (error) {
        return NextResponse.json({
            message: messages.error.default, error
        }, {
            status: 500
        })
    }
}

