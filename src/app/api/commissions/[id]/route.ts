import { connectMongoDB } from "@/libs/mongodb";
import { ICommissionSchema } from "@/models/Comissions";
import Commission from "@/models/Comissions";
import { messages } from "@/utils/messages";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const findCommission = await Commission.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
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

        if (!findCommission) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Comission encontrada',
            user: findCommission[0],
            commission: findCommission[0]
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
