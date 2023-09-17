import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectMongoDB()
        const users = await User.find()
        const response =  NextResponse.json({
            users,
            messages: messages.success.userCreated
        },{
            status: 200
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}