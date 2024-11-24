import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/promoters/')[1]
        const prisma = new PrismaClient()
        
          const findPromoter = await prisma.promoter.findUnique({
            where:{
                id
            },
            include: {
              user: true,               
              address: true, 
              user_info: true,  
              made_by: true, 
            }
          });

        if (!findPromoter) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const findMovements = await prisma.movement.findMany({
            where:{
                promoter_id: id
            },
            include: {
              user: true
            },
            orderBy:{
                created_at: 'desc'
            }
          });

          const findCommissions = await prisma.commission.findMany({
            where:{
                promoter_id: id
            },
            include: {
              user: true,
              promoter: true,
              coupon: true
            },
            orderBy:{
                created_at: 'desc'
            }
          });

        const response = NextResponse.json({
            message: 'Promotor encontrado',
            user: findPromoter,
            movements: findMovements,
            commissions: findCommissions
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
        const prisma = new PrismaClient()

        const findPromoter = await prisma.promoter.findUnique({
            where:{
                id
            }
          });

        if (!findPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const { update_promoter } = await req.json()
        const { user_info, address } = update_promoter
        const updatedPromoter = await prisma.promoter.update({
            where: {
                id: id,
            },
            data: {
                user_info: {
                    update: user_info,
                },
                address: {
                    update: address,
                },
                updated_at: new Date(),
            },
            include:{
                user: true,
                user_info: true,
                address: true,
                made_by: true
            }
        });

        if (!updatedPromoter) {
            return NextResponse.json({
                message: 'El promotor no pudo ser actualizado',
            }, {
                status: 500
            })
        }

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
        const { pathname } = new URL(req.url);
        const id = pathname.split('/api/promoters/')[1];
        const prisma = new PrismaClient();

        // Find the promoter and its relationships
        const existPromoter = await prisma.promoter.findUnique({
            where: { id },
            include: {
                commissions: true,
                movement: true,
                user_info: true,
                address: true,
            },
        });

        if (!existPromoter) {
            return NextResponse.json(
                { message: 'El promotor no existe' },
                { status: 404 }
            );
        }
        // Perform deletions in the correct order
        await prisma.$transaction([
            // Delete commissions related to the promoter
            prisma.commission.deleteMany({
                where: { promoter_id: id },
            }),
            // Delete movements related to the promoter
            prisma.movement.deleteMany({
                where: { promoter_id: id },
            }),
            // Finally, delete the promoter
            prisma.promoter.delete({
                where: { id },
            }),
            // Delete PersonalInfo associated with the promoter
            prisma.personalInfo.delete({
                where: { id: existPromoter.user_info_id },
            }),
            // Delete Address associated with the promoter
            prisma.address.delete({
                where: { id: existPromoter.address_id },
            }),
        ]);

        return NextResponse.json(
            { message: 'Promotor eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                message: 'Error eliminando el promotor',
                error: error.message,
            },
            { status: 500 }
        );
    }
}