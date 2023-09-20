import { connectMongoDB } from '@/libs/mongodb'
import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const response =  NextResponse.json({
            promoter: [],
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

export async function GET(){
    try{
        await connectMongoDB()
        const promoters = await Promoter.find().populate('user')
        const response =  NextResponse.json({
            promoters,
            messages: messages.success.userCreated
        },{
            status: 200
        })
        return response
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}

