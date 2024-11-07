import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
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

        const { woo_keys: { client_id, client_secret, store_url } } = configurations

        const WooApi = new WooCommerceRestApi({
            url: store_url,
            consumerKey: client_id,
            consumerSecret: client_secret,
            version: "wc/v3",
            queryStringAuth: true

        })

        const { data: orders } = await WooApi.get("orders")

        const response = NextResponse.json({
            message: 'Pedidos encontrados',
            orders
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
        const response = NextResponse.json({
            message: 'Pedidos eliminado exitosamente',
            deleted_promoter: []
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
