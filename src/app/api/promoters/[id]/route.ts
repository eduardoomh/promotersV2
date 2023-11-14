import { connectMongoDB } from "@/libs/mongodb";
import Commission from "@/models/Comissions";
import Movement from "@/models/Movement";
import Promoter, { IPromoterSchema } from "@/models/Promoter";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/promoters/')[1]

        const findPromoter = await Promoter.aggregate([
            { $match: {_id: id } },
            {
              $lookup: {
                from: 'users', // Nombre de la colección de usuarios (ajusta según tu modelo)
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
                $sort: { _id: -1 },
            },
          ]);

        if (!findPromoter) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const findMovements = await Movement.aggregate([
            { $match: { promoter: id } },
            {
                $lookup: {
                    from: 'users', // Nombre de la colección de usuarios (ajusta según tu modelo)
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $sort: { _id: -1 },
            },
        ]);
        const findcommissions = await Commission.aggregate([
            { $match: { promoter: id } },
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
            message: 'Promotor encontrado',
            user: findPromoter[0],
            movements: findMovements,
            commissions: findcommissions
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
        const id = pathname.split('/api/promoters/')[1]

        const findPromoter: IPromoterSchema | null = await Promoter.findOne({ _id: id })

        if (!findPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const { update_promoter } = await req.json()
        const { personal_info, address } = update_promoter
        const updatePromoter = await Promoter.updateOne({ _id: id }, {
            $set: {
                personal_info,
                address,
                updated_at: Date.now()
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

export async function DELETE(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/promoters/')[1]

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
