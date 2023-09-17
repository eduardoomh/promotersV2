import { connectMongoDB } from '@/libs/mongodb'
import Settings, { ISettingSchema } from '@/models/Settings'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const { woo_keys } = body

        const newSettings: ISettingSchema = new Settings({
            woo_keys: {
                client_id: woo_keys.client_id,
                client_secret: woo_keys.client_secret,
                store_url: woo_keys.store_url,
            },
        })

        //@ts-ignore
        const settingsCreated = newSettings._doc

        await newSettings.save()

        const response = NextResponse.json({
            settings: settingsCreated,
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
        await connectMongoDB()
        const settings = await Settings.find()

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