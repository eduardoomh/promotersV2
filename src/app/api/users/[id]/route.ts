import { messages } from "@/utils/messages";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]
        const prisma = new PrismaClient()

        const findUser = await prisma.user.findUnique({
            where: {
                id,
            },
        })
        let existPromoter = undefined;
        let userStats = undefined;

        if (!findUser) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        if (findUser.role === 'promoter') {
            existPromoter = await prisma.promoter.findFirst({
                where: {
                    user_id: findUser.id,
                },
                include:{
                    user: true,
                    address: true,
                    user_info: true,
                    made_by: true,
                }  
            })

        } else {
            const madeByUsers = await prisma.user.findFirst({
                where: {
                    made_by_id: findUser.id,
                },
            })
            const madeByPromoters = await prisma.promoter.findFirst({
                where: {
                    made_by_id: findUser.id,
                },
                include: {
                    user: true,
                    address: true,
                    user_info: true,
                    made_by: true,

                },
                orderBy: {
                    created_at: 'desc'
                }
            })

            userStats = {
                users: madeByUsers || [],
                promoters: madeByPromoters || []
            }
        }

        //@ts-ignore
        const { password, ...rest } = findUser

        const response = NextResponse.json({
            message: 'Usuario encontrado',
            user: rest,
            promoter: existPromoter,
            user_stats: userStats
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
        const id = pathname.split('/api/users/')[1]
        const prisma = new PrismaClient()

        const findUser = await prisma.user.findUnique({
            where: {
                id,
            },
        })

        if (!findUser) {
            return NextResponse.json({
                message: 'El usuario no existe',
            }, {
                status: 500
            })
        }

        const { name, email } = await req.json()
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                updated_at: new Date()
            },
        });

        if (!updatedUser) {
            return NextResponse.json({
                message: 'El usuario no pudo ser actualizado',
            }, {
                status: 500
            })
        }
        //@ts-ignore
        const { password, ...rest } = updatedUser

        const response = NextResponse.json({
            message: 'El usuario se ha actualizado',
            updated_user: rest
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
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]
        const prisma = new PrismaClient()

        const findUser = await prisma.user.findUnique({
            where: {
                id,
            },
        })
        if (!findUser) {
            return NextResponse.json({
                message: 'El usuario no existe',
            }, {
                status: 500
            })
        }

        const deleteUser = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        if (!deleteUser) {
            return NextResponse.json({
                message: 'El usuario no pudo ser eliminado',
            }, {
                status: 500
            })
        }

        //check if exist promoter with the same id
        const existPromoter = await prisma.promoter.findFirst({
            where: {
                user_id: id,
            },
        })

        if (existPromoter) {
            const deletePromoter = await prisma.promoter.deleteMany({
                where: {
                    user_id: id,
                },
            });

            if (deletePromoter.count < 1) {
                return NextResponse.json({
                    message: 'El promotor no pudo ser eliminado',
                }, {
                    status: 500
                })
            }
        }

        const response = NextResponse.json({
            message: 'Usuario eliminado exitosamente',
            deleted_user: findUser
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
