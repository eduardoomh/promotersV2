import { connectMongoDB } from "@/libs/mongodb"
import Commission from "@/models/Comissions"
import Logs from "@/models/Logs"
import Movement, { IMovementSchema } from "@/models/Movement"
import PromoterModel from "@/models/Promoter"
import Settings, { ISettingSchema } from "@/models/Settings"
import User, { IUserSchema } from "@/models/User"
import { messages } from "@/utils/messages"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const findSettings: ISettingSchema | null = await Settings.findOne()

        if (!findSettings) {
            return NextResponse.json({
                message: 'Los ajustes no han sido encontrados',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
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
export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const body = await req.json()
        console.log(body)

        const createLog = await Logs.create({
            data: JSON.stringify(body)
        })

        if (!createLog) {
            return NextResponse.json({
                message: 'Ocurrio un error al guardar los datos',
            }, {
                status: 500
            })
        }

        const coupons = body.coupon_lines

        if (coupons && coupons.lenght > 0) {
            for (let coupon of coupons) {
                const commission = await Commission.findOne({ "coupon.id": coupon.id, "coupon.code": coupon.code })

                if (commission) {
                    try {
                        const userFound = await User.findOne({ _id: commission.user })
                        const promoterFound = await PromoterModel.findOne({ _id: commission.user })

                        if(userFound && promoterFound){
                            const newMovement: IMovementSchema = new Movement({
                                user: userFound._id,
                                promoter: promoterFound._id,
                                amount: commission.earnings.type === 'percentage' ? 
                                    Number(body.discount_total) * Number(commission.earnings.amount / 100) : 
                                    commission.earnings.amount,
                                type: 'payment',
                                description: `Comisión pagada por pedido #${body.id}`,
                                security: {
                                    before_mod: promoterFound.balance,
                                    after_mod: Number(promoterFound.balance) + commission.earnings.type === 'percentage' ? 
                                    Number(body.discount_total) * Number(commission.earnings.amount / 100) : 
                                    commission.earnings.amount,
                                },
                                made_by: '650cd890e104dde745fecba2'
                            })
                            await newMovement.save()
                        }

                       
                    } catch (error) {
                        console.log(error)
                        await Logs.create({
                            data: JSON.stringify(error)
                        })
                    }
                }
            }
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            log: createLog
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