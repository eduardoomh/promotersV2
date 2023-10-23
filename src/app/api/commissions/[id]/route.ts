import { connectMongoDB } from "@/libs/mongodb";
import CommissionModel, { ICommissionSchema } from "@/models/Comissions";
import Commission from "@/models/Comissions";
import Promoter, { IPromoterSchema } from "@/models/Promoter";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const findCommission = await Commission.findOne({ _id: id }).populate('user').populate('promoter')

        if (!findCommission) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Comission encontrada',
            user: findCommission
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
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const findCommission: ICommissionSchema | null = await Commission.findOne({ _id: id })

        if (!findCommission) {
            return NextResponse.json({
                message: 'La comisión no existe',
            }, {
                status: 500
            })
        }

        const { update_commission } = await req.json()
        const { user, promoter, coupon, earnings } = update_commission
        const updateCommission = await Commission.updateOne({ _id: id }, {
            $set: {
                user,
                promoter,
                coupon,
                earnings,
                updated_at: Date.now()
            }
        })

        if (updateCommission.modifiedCount < 1) {
            return NextResponse.json({
                message: 'La comisión no pudo ser actualizada',
            }, {
                status: 500
            })
        }

        const updatedComission = await Commission.findOne({ _id: id })

        const response = NextResponse.json({
            message: 'La comisión se ha actualizado',
            updated_commission: updatedComission
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
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const existCommission = await Commission.findOne({ _id: id })

        if (!existCommission) {
            return NextResponse.json({
                message: 'La comisión no existe',
            }, {
                status: 500
            })
        }

        const deleteCommission = await Commission.deleteOne({ _id: id })
        if (deleteCommission.deletedCount < 1) {
            return NextResponse.json({
                message: 'La comisión no pudo ser eliminada',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Comisión eliminada exitosamente',
            deleted_commission: existCommission
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
