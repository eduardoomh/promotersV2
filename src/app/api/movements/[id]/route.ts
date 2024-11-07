import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/movements/')[1]
        const prisma = new PrismaClient()
        const findMovement = await prisma.movement.findUnique({
          where:{
            id
          },
          include:{
            user: true,
            promoter: true
          }
        })
    
          // findMovement ahora contendrá el resultado de la agregación
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

