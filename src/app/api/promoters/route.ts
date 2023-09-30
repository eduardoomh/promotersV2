import { connectMongoDB } from '@/libs/mongodb'
import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

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
        const promoters = await Promoter.find().populate('user').sort({$natural: -1})

        console.log("promoror", promoters)

        const response = NextResponse.json({
            promoters,
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

export async function DELETE(req: NextRequest) {
    try {
        await connectMongoDB()
        const { search } = new URL(req.url)
        const params = new URLSearchParams(search);
        const id = params.get('id')

        const existPromoter = await Promoter.findOne({ _id: id })

        if (!existPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const deletePromoter = await Promoter.deleteOne({ _id: id })
        if (deletePromoter.deletedCount < 1) {
            return NextResponse.json({
                message: 'El promotor no pudo ser eliminado',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Promotor eliminado exitosamente',
            deleted_promoter: existPromoter
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

export async function PATCH(req: NextRequest) {
    try {
        await connectMongoDB()
        const { search } = new URL(req.url)
        const params = new URLSearchParams(search);
        const id = params.get('id')

        const findPromoter: IPromoterSchema | null = await Promoter.findOne({ _id: id })

        if (!findPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const { name, email } = await req.json()
        const updatePromoter = await Promoter.updateOne({ _id: id }, {
            $set: {
                name,
                email
            }
        })

        if (updatePromoter.modifiedCount < 1) {
            return NextResponse.json({
                message: 'El promotor no pudo ser actualizado',
            }, {
                status: 500
            })
        }

        const updatedPromoter = await Promoter.findOne({ _id: id })

        const response = NextResponse.json({
            message: 'El promotor se ha actualizado',
            updated_promoter: updatedPromoter
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