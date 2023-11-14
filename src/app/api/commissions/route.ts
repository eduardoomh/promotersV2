import { connectMongoDB } from '@/libs/mongodb'
import Promoter from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Commission, { ICommissionSchema } from '@/models/Comissions'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const { new_commission } = body
        const { user, promoter, coupon, earnings } = new_commission

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
            !user || !promoter || !coupon || !promoter
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

        const newCommission: ICommissionSchema = new Commission({
            user,
            promoter,
            coupon,
            earnings,
            made_by: data._id
        })

        //@ts-ignore
        const commissionCreated = newCommission._doc

        await newCommission.save()

        const response = NextResponse.json({
            commission: commissionCreated,
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
        const commissions = await Commission.aggregate([
            {
              $lookup: {
                from: 'users', // Nombre de la colección de usuarios (ajusta según tu modelo)
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $lookup: {
                from: 'promoters', // Nombre de la colección de promotores (ajusta según tu modelo)
                localField: 'promoter',
                foreignField: '_id',
                as: 'promoter',
              },
            },
            {
              $unwind: '$user',
            },
            {
              $unwind: '$promoter',
            },
            {
                $sort: { _id: -1 },
            },
          ]);
          

        const response = NextResponse.json({
            commissions,
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