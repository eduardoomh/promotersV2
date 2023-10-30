import { connectMongoDB } from '@/libs/mongodb'
import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()

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
        await connectMongoDB()
        const token = req.cookies.get('auth_cookie')

        if(!token){
            return NextResponse.json({
                message: messages.error.notAuthorized
            },{
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(token.value, 'secretch@mos@')
        //@ts-ignore
        const {data} = IsTokenValid

        if(!data){
            return NextResponse.json({
                message: messages.error.notAuthorized
            },{
                status: 400
            })
        }

        const promoter = await Promoter.findOne({user: data._id}).populate('user').sort({$natural: -1})
        console.log(promoter)
        const response = NextResponse.json({
            promoter,
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

