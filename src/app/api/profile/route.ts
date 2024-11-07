import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
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
        const prisma = new PrismaClient()
        const token = req.cookies.get('auth_cookie')

        if (!token) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(token.value, 'secretch@mos@S48=ov6.TD^q8F')
        //@ts-ignore
        const { data } = IsTokenValid

        if (!data) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const promoter = await prisma.promoter.findFirst({
            where:{
                user_id: data.id
            },
            include: {
              user: true,               
              address: true, 
              user_info: true,  
              made_by: true, 
            }
          });

        const response = NextResponse.json({
            promoter: promoter,
            messages: messages.success.authorized
        }, {
            status: 200
        })
        return response
    } catch (error) {
        console.log(error, "entra aca")
        return NextResponse.json({
            message: messages.error.default, error
        }, {
            status: 500
        })
    }
}

