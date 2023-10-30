import { connectMongoDB } from '@/libs/mongodb'
import Promoter from '@/models/Promoter'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
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
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/profile/')[1]
        const user = await User.findOne({_id: id}).sort({$natural: -1})

        if(!user){
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }
        const promoter = await Promoter.findOne({user: id}).populate('user').sort({$natural: -1})

        if(!promoter){
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            promoter,
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

