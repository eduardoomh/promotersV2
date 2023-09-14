import { connectMongoDB } from '@/libs/mongodb'
import User, { IUserSchema } from '@/models/User'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body: IUserSchema = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }

        const userFind = await User.findOne({ email })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.userNotFound
            }, {
                status: 400
            })
        }

        const isCorrectPassw: boolean = await bcrypt.compare(
            password,
            userFind.password
        )
        if(!isCorrectPassw){
            return NextResponse.json({
                message: messages.error.incorrectPassw
            }, {
                status: 400
            }) 
        }

         //@ts-ignore
         const {password: passw, ...rest} = userFind._doc

         const token = jwt.sign({data: rest}, 'secretch@mos@',{
            expiresIn: 86400
        })

        const response =  NextResponse.json({
            userLogged: rest,
            messages: messages.success.userLogged
        },{
            status: 200
        })

        response.cookies.set('auth_cookie', token,{
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/'
        })

        return response


    } catch (error) {
        console.log(error)
    }
}