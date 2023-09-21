import { connectMongoDB } from '@/libs/mongodb'
import User, { IUserSchema } from '@/models/User'
import { validateEmail } from '@/utils/isValidEmail'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const {name, email, password, confirm_password, role} = body

        const cookieStore = cookies()
        const auth_cookie: any = cookieStore.get('auth_cookie')

        if (!auth_cookie.value) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(auth_cookie.value, 'secretch@mos@')
        //@ts-ignore
        const { data } = IsTokenValid

        //validar campos enviados
        if(!email || !password || !confirm_password){
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

        if(password !== confirm_password){
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
            name,
            email,
            role,
            made_by: data._id,
            password: hashedPassword
        })

        //@ts-ignore
        const {password: passw, ...rest} = newUser._doc

        await newUser.save()
        const response =  NextResponse.json({
            newUser: rest,
            message: messages.success.userCreated
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