import { connectMongoDB } from '@/libs/mongodb'
import User, { IUserSchema } from '@/models/User'
import { validateEmail } from '@/utils/isValidEmail'
import { messages } from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Promoter from '@/models/Promoter'

export async function GET() {
    try {
        await connectMongoDB()
        const users = await User.find().sort({$natural: -1})
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

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const {name, email, password, confirm_password, role} = body
        console.log(body)

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
            message: messages.success.userCreated
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

export async function DELETE(req: NextRequest){
    try{
        const {search} = new URL(req.url)
        const params = new URLSearchParams(search);
        const id = params.get('id')
        
        const deleteUser = await User.deleteOne({_id: id})
        if(deleteUser.deletedCount < 1){
            return NextResponse.json({
                message: 'El usuario no pudo ser eliminado',
            },{
                status: 500
            })
        }

        //check if exist promoter with the same id
        const deletePromoter = await Promoter.findOne({_id: id})

        if(deletePromoter){
            const deletePromoter = await Promoter.deleteOne({_id: id})
            if(deletePromoter.deletedCount < 1){
                return NextResponse.json({
                    message: 'El promotor no pudo ser eliminado',
                },{
                    status: 500
                })
            }
        }


        const response =  NextResponse.json({
            message: 'Usuario eliminado exitosamente'
        },{
            status: 200
        })

        return response

    }catch(error){
        console.log(error)
    }
}