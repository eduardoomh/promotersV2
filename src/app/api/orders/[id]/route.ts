import Promoter, { IPromoterSchema } from "@/models/Promoter";
import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/orders/')[1]
        const prisma = new PrismaClient()
        const configurations = await prisma.setting.findFirst({
            include:{
                woo_keys: true
            }
        })

        if (!configurations) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const { client_id, client_secret, store_url } = configurations?.woo_keys

        const WooApi = new WooCommerceRestApi({
            url: store_url,
            consumerKey: client_id,
            consumerSecret: client_secret,
            version: "wc/v3",
            queryStringAuth: true

        })

        const order = await WooApi.get(`orders/${id}`);
        const response = NextResponse.json({
            message: 'Pedido encontrado',
            coupon: {
                ...order.data,
            },
            order: {
                ...order.data,
            } 
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
        const { user_info, address } = update_promoter
        const updatePromoter = await Promoter.updateOne({ _id: id }, {
            $set: {
                user_info,
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
