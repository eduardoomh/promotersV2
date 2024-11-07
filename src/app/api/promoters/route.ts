import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { new_promoter } = body
        const { user, user_info, address } = new_promoter
        const prisma = new PrismaClient()
 
        const cookieStore = cookies()
        const auth_cookie: any = cookieStore.get('auth_cookie')

        if (!auth_cookie.value) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(auth_cookie.value, 'secretch@mos@S48=ov6.TD^q8F')
        //@ts-ignore
        const { data } = IsTokenValid

        //validar campos enviados
        if (
            !user || !user_info || !address
        ) {
            return NextResponse.json({
                message: messages.error.needProps
            }, {
                status: 400
            })
        }

        const userFind = await prisma.user.findUnique({
            where: {
                id: user,
            },
        })
        const promoterFind = await prisma.promoter.findFirst({
            where: {
                user_id: user,
            },
        })

        if (!userFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        if (promoterFind) {
            return NextResponse.json({
                message: messages.error.default
            }, {
                status: 400
            })
        }

        const promoterCreated = await prisma.promoter.create({
            data: {
              user: {
                connect: { id: userFind.id },
              },
              user_info: {
                create: {
                  phone: user_info.phone,
                  mobile_phone: user_info.mobile_phone,
                  rfc: user_info.rfc,
                },
              },
              address: {
                create: {
                  street: address.street,
                  postal_code: address.postal_code,
                  district: address.district,
                  state: address.state,
                  city: address.city,
                  country: address.country,
                },
              },
              balance: 0,
              type: 'active',
              made_by: {
                connect: { id: data.id },
              },
            },
            include: {
                user: true,
                user_info: true,
                address: true, 
                made_by: true, 
            }
          });

        const response = NextResponse.json({
            promoter: promoterCreated,
            message: messages.success.promoterCreated
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

export async function GET() {
    try {
        const prisma = new PrismaClient()
        const promoters = await prisma.promoter.findMany({
            include: {
              user: true,               
              address: true, 
              user_info: true,  
              made_by: true, 
            },
            orderBy: {
              created_at: 'desc',       // Ordenar por fecha de creación de manera descendente
            },
          });

        const response = NextResponse.json({
            promoters,
            messages: messages.success.authorized
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
        const { search } = new URL(req.url)
        const params = new URLSearchParams(search);
        const id = params.get('id')
        const prisma = new PrismaClient()

        const existPromoter = await Promoter.findOne({ _id: id })

        if (!existPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const deletePromoter = await Promoter.deleteOne({ _id: id })
        if (deletePromoter.deletedCount < 1) {
            return NextResponse.json({
                message: 'El promotor no pudo ser eliminado',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Promotor eliminado exitosamente',
            deleted_promoter: existPromoter
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
        const { search } = new URL(req.url)
        const params = new URLSearchParams(search);
        const id = params.get('id')
        const prisma = new PrismaClient()

        const findPromoter: IPromoterSchema | null = await Promoter.findOne({ _id: id })

        if (!findPromoter) {
            return NextResponse.json({
                message: 'El promotor no existe',
            }, {
                status: 500
            })
        }

        const { name, email } = await req.json()
        const updatePromoter = await Promoter.updateOne({ _id: id }, {
            $set: {
                name,
                email
            }
        })

        if (updatePromoter.modifiedCount < 1) {
            return NextResponse.json({
                message: 'El promotor no pudo ser actualizado',
            }, {
                status: 500
            })
        }

        const updatedPromoter = await Promoter.findOne({ _id: id })

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