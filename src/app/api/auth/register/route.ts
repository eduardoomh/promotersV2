import { connectMongoDB } from '@/libs/mongodb'
import User, { IUserSchema } from '@/models/User'
import { validateEmail } from '@/utils/isValidEmail'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const {email, password, confirmPassword} = body
        console.log(body)

        //validar campos enviados
        if(!email || !password || !confirmPassword){
            return NextResponse.json({
                message: messages.error.needProps
            },{
                status: 400
            })
        }
        if(!validateEmail(email)){
            return NextResponse.json({
                message: messages.error.emailNotValid
            },{
                status: 400
            })
        }

        if(password !== confirmPassword){
            return NextResponse.json({
                message: messages.error.passwordNotMatch
            },{
                status: 400
            })
        }

        const userFind = await User.findOne({email})

        if(userFind){
            return NextResponse.json({
                message: messages.error.emailExist
            },{
                status: 400
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword
        })

        //@ts-ignore
        const {password: passw, ...rest} = newUser._doc

        await newUser.save()

        const token = jwt.sign({data: rest}, 'secretch@mos@',{
            expiresIn: 86400
        })

        const response =  NextResponse.json({
            newUser: rest,
            messages: messages.success.userCreated
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
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}