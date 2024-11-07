import { arrayToString, stringToArray } from "@/utils/arraysToString";
import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const findCommission = await prisma.commission.findUnique({
            where:{
                id
            },
            include:{
                user: true,
                promoter: true,
                coupon: true,
                made_by: true
            }
        })

        if (!findCommission) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Comission encontrada',
            user: {
                ...findCommission,
                coupon: {
                    ...findCommission.coupon,
                    products: stringToArray(findCommission.coupon.products)
                }
            },
            commission: {
                ...findCommission,
                coupon: {
                    ...findCommission.coupon,
                    products: stringToArray(findCommission.coupon.products)
                }
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
        const prisma = new PrismaClient()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const findCommission = await prisma.commission.findUnique({
            where:{
                id
            }
        })

        if (!findCommission) {
            return NextResponse.json({
                message: 'La comisión no existe',
            }, {
                status: 500
            })
        }

        const { update_commission } = await req.json()
        const { 
            earnings: { type, amount }, coupon: { id: couponId, code, products } 
        } = update_commission

        const updatedComission = await prisma.commission.update({
            where: {
                id: id,
            },
            data: {
                coupon: {
                    update: {
                        coupon_id: `${couponId}`,
                        code,
                        products: arrayToString(products)
                    },
                },
                earning_type: type,
                earning_amount: amount,
                updated_at: new Date(),
            },
            include:{
                user: true,
                coupon: true,
                promoter: true,
                made_by: true
            }
        });

        if (!updatedComission) {
            return NextResponse.json({
                message: 'La comisión no pudo ser actualizada',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'La comisión se ha actualizado',
            updated_commission: {
                ...updatedComission,
                coupon: {
                    ...updatedComission.coupon,
                    products: stringToArray(updatedComission.coupon.products)
                }
            },
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
        const prisma = new PrismaClient()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/commissions/')[1]

        const existCommission = await prisma.commission.findUnique({
            where:{
                id
            }
        })

        if (!existCommission) {
            return NextResponse.json({
                message: 'La comisión no existe',
            }, {
                status: 500
            })
        }

        const deletedCommission = await prisma.commission.delete({
            where: {
              id: id,
            },
            include: {
                user: true,               
                promoter: true, 
                coupon: true,  
                made_by: true, 
              }
          });

        if (!deletedCommission) {
            return NextResponse.json({
                message: 'La comisión no pudo ser eliminada',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Comisión eliminada exitosamente',
            deleted_commission: deletedCommission
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
