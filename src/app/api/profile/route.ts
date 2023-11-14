import { connectMongoDB } from '@/libs/mongodb'
import Promoter from '@/models/Promoter'
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
            console.log("fallaa", token)
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
            console.log("no se autoriza")
            return NextResponse.json({
                message: messages.error.notAuthorized
            },{
                status: 400
            })
        }

        const promoter = await Promoter.aggregate([
            { $match: { user: data._id } },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
                $sort: { _id: -1 },
            },
          ]);
  
        const response = NextResponse.json({
            promoter: promoter[0],
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

