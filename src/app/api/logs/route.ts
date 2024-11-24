import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({
            logs: [],
            message: "Logs encontrados con éxito"
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
        const logs = await prisma.logs.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        const response = NextResponse.json({
            logs,
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