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
    const prisma = new PrismaClient();
  
    try {
      const { pathname } = new URL(req.url);
      const id = pathname.split('/api/users/')[1];
  
      // Iniciar una transacción
      const result = await prisma.$transaction(async (prismaTransaction) => {
        // Verificar si el usuario existe
        const findUser = await prismaTransaction.user.findUnique({
          where: { id },
        });
  
        if (!findUser) {
          throw new Error('El usuario no existe');
        }
  
        // Obtener los promotores relacionados
        const promoters = await prismaTransaction.promoter.findMany({
          where: { user_id: id },
        });
  
        const personalInfoIds = promoters.map((promoter) => promoter.user_info_id);
        const addressIds = promoters.map((promoter) => promoter.address_id);
        const promoterIds = promoters.map((promoter) => promoter.id);
  
        // Eliminar movimientos relacionados al usuario o a sus promotores
        const deleteMovements = await prismaTransaction.movement.deleteMany({
          where: {
            OR: [
              { user_id: id },
              { promoter_id: { in: promoterIds } },
            ],
          },
        });
  
        // Eliminar comisiones relacionadas al usuario o a sus promotores
        const deleteCommissions = await prismaTransaction.commission.deleteMany({
          where: {
            OR: [
              { user_id: id },
              { promoter_id: { in: promoterIds } },
            ],
          },
        });
  
        // Eliminar promotores primero para liberar claves foráneas
        const deletePromoters = await prismaTransaction.promoter.deleteMany({
          where: { user_id: id },
        });
  
        // Ahora podemos eliminar PersonalInfo y Address
        await prismaTransaction.personalInfo.deleteMany({
          where: { id: { in: personalInfoIds } },
        });
  
        await prismaTransaction.address.deleteMany({
          where: { id: { in: addressIds } },
        });
  
        // Finalmente, eliminar el usuario
        await prismaTransaction.user.delete({
          where: { id },
        });
  
        return {
          deletedUser: findUser,
          deletedPromotersCount: deletePromoters.count,
          deletedPersonalInfosCount: personalInfoIds.length,
          deletedAddressesCount: addressIds.length,
          deletedMovementsCount: deleteMovements.count,
          deletedCommissionsCount: deleteCommissions.count,
        };
      });
  
      // Respuesta exitosa
      return NextResponse.json(
        {
          message:
            'Usuario, promotores, comisiones, movimientos, direcciones e información personal eliminados exitosamente',
          deleted_user: result.deletedUser,
          deleted_promoters_count: result.deletedPromotersCount,
          deleted_personal_infos_count: result.deletedPersonalInfosCount,
          deleted_addresses_count: result.deletedAddressesCount,
          deleted_movements_count: result.deletedMovementsCount,
          deleted_commissions_count: result.deletedCommissionsCount,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Error eliminando usuario:', error);
  
      // Respuesta de error
      return NextResponse.json(
        {
          message: error.message || 'Ocurrió un error eliminando el usuario',
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }