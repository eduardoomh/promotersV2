import { connectMongoDB } from "@/libs/mongodb";
import Movement from "@/models/Movement";
import { messages } from "@/utils/messages";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/movements/')[1]
        const findMovement = await Movement.aggregate([
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
            }
          ]);
          
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
            movement: findMovement[0],
            user: findMovement[0]
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

