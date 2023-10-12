import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        //@ts-ignore
        const cookie = req.cookies.get('auth_cookie')

        if(!cookie){
            return NextResponse.json({
                message: messages.error.default
            },{
                status: 400
            })
        }

        const tokenBody = jwt.verify(cookie.value, 'secretch@mos@')
        //@ts-ignore
        const {email} = tokenBody.data

        const userFind = await User.findOne({email})

        if(!userFind){
            return NextResponse.json({
                message: messages.error.emailExist
            },{
                status: 400
            })
        }

        const token = jwt.sign({data: userFind}, 'secretch@mos@',{
            expiresIn: 0
        })

        const response =  NextResponse.json({
            user: userFind,
            message: messages.success.logout
        },{
            status: 200
        })

        response.cookies.set('auth_cookie', token,{
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0, 
            path: '/'
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