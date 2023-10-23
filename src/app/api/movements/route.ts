import { connectMongoDB } from '@/libs/mongodb'
import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Movement from '@/models/Movement'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const { new_promoter } = body
        const { user, personal_info, address } = new_promoter

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
            !user || !personal_info || !address
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

        if (promoterFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        const newPromoter: IPromoterSchema = new Promoter({
            user,
            personal_info: {
                phone: personal_info.phone,
                mobile_phone: personal_info.mobile_phone,
                rfc: personal_info.rfc,
            },
            address: {
                street: address.street,
                postal_code: address.postal_code,
                district: address.district,
                state: address.state,
                city: address.city,
                country: address.country,
            },
            balance: 0,
            type: 'active',
            made_by: data._id
        })

        //@ts-ignore
        const promoterCreated = newPromoter._doc

        await newPromoter.save()

        const response = NextResponse.json({
            promoter: promoterCreated,
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
        const movements = await Movement.find().populate('user').populate('promoter').sort({$natural: -1})

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
