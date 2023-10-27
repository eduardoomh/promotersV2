import { connectMongoDB } from "@/libs/mongodb";
import Movement from "@/models/Movement";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/movements/')[1]

        const findMovement = await Movement.findOne({ _id: id }).populate('user').populate('promoter')

        if (!findMovement) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Movmiento encontrado',
            movement: findMovement,
            user: findMovement
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

