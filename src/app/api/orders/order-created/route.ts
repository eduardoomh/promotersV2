import { connectMongoDB } from "@/libs/mongodb"
import Settings, { ISettingSchema } from "@/models/Settings"
import { messages } from "@/utils/messages"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
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

        const updateSetting = await Settings.updateOne({ _id: findSettings._id }, {
            $set: {
                webhook: {
                    data: JSON.stringify(req.body)
                }
            }
        })

        if (updateSetting.modifiedCount < 1) {
            return NextResponse.json({
                message: 'Los ajustes han sido actualizados',
            }, {
                status: 500
            })
        }
        const updatedSettings: ISettingSchema | null = await Settings.findOne();

        if (!updatedSettings) {
            return NextResponse.json({
                message: 'Los ajustes no han sido actualizados',
            }, {
                status: 500
            })
        }
        //@ts-ignore
        const finalSettings = updatedSettings._doc

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            updated_settings: finalSettings
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