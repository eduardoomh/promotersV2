import { connectMongoDB } from '@/libs/mongodb'
import Promoter from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Movement, { IMovementSchema } from '@/models/Movement'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const { new_movement } = body
        const { user, promoter, commission, amount, type } = new_movement

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
        if (
            !user || !promoter || !commission || !amount || !type
        ) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }

        const userFind = await User.findOne({ _id: user })
        const promoterFind = await Promoter.findOne({ user })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        if (!promoterFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }
        let updateBalance
        if(type === 'discount'){
            await Promoter.updateOne({user},{
                $set: {
                   balance: Number(promoterFind.balance) - Number(amount.toFixed(2)) 
                }
            })
            updateBalance = Number(promoterFind.balance) - Number(amount.toFixed(2))
        }else{
            await Promoter.updateOne({user},{
                $set: {
                   balance: Number(promoterFind.balance) + Number(amount.toFixed(2)) 
                }
            })
            updateBalance = Number(promoterFind.balance) + Number(amount.toFixed(2))
        }
       

        const newMovement: IMovementSchema = new Movement({
            user,
            promoter,
            amount: Number(amount),
            type,
            commission,
            security: {
                before_mod: Number(promoterFind.balance),
                after_mod: updateBalance
            },
            made_by: data._id
        })

        //@ts-ignore
        const movementCreated = newMovement._doc

        await newMovement.save()

        const response = NextResponse.json({
            movement: movementCreated,
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

export async function GET() {
    try {
        await connectMongoDB()
        const movements = await Movement.find().populate('user').populate('promoter').populate('commission').sort({$natural: -1})

        const response = NextResponse.json({
            movements,
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