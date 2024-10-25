import { messages } from '@/utils/messages'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { woo_keys } = body
        const prisma = new PrismaClient()

        const newSettings = await prisma.setting.create({
            data: {
                woo_keys: {
                    create: {
                        client_id: woo_keys.client_id,
                        client_secret: woo_keys.client_secret,
                        store_url: woo_keys.store_url,
                    },
                },
                webhook: {
                    create: {
                        data: "default"
                    }
                }
            },
            include: {
                woo_keys: true,
                webhook: true
            }
        });

        const response = NextResponse.json({
            settings: newSettings,
            messages: messages.success.userCreated
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
        const settings = await prisma.setting.findMany({
            include:{
                woo_keys: true
            }
        })

        const response = NextResponse.json({
            settings,
            messages: messages.success.userCreated
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