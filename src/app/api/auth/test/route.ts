import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            url: process.env.DATABASE_URL,
            send: process.env.RESEND_SECRET_KEY,
            message: 'SUCCESS',
            made: process.env.WEBHOOK_DEFAULT_USER_MADE_BY
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