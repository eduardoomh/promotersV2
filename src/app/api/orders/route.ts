import { connectMongoDB } from "@/libs/mongodb";
import Settings from "@/models/Settings";
import { messages } from "@/utils/messages";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const configurations = await Settings.find()

        if (!configurations) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const { woo_keys: { client_id, client_secret, store_url } } = configurations[0]

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
        await connectMongoDB()
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
