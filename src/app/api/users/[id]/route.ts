import User from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]

        const findUser = await  User.findOne({_id: id})

        if(!findUser){
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }
        //@ts-ignore
        const {password, ...rest} = findUser._doc

        const response = NextResponse.json({
            message: 'Usuario encontrado',
            user: rest
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