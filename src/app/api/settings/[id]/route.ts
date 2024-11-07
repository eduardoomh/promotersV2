import { messages } from "@/utils/messages"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const findSettings = await prisma.setting.findFirst()

        if (!findSettings) {
            return NextResponse.json({
                message: 'Los ajustes no han sido encontrados',
            }, {
                status: 500
            })
        }

        const { woo_keys } = await req.json()
        const { client_id, client_secret, store_url } = woo_keys

        const updatedSettings = await prisma.setting.update({
            where: {
                id: findSettings.id,
            },
            data: {
                woo_keys: {
                    update: {
                        client_id,
                        client_secret,
                        store_url
                    },
                }
            },
            include:{
                woo_keys: true,
                webhook: true,
            }
        });

        if (!updatedSettings) {
            return NextResponse.json({
                message: 'Los ajustes NO han sido actualizados',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            updated_settings: updatedSettings
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