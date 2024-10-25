import { messages } from '@/utils/messages'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient()
    const response = NextResponse.json({
      promoter: [],
      messages: messages.success.userCreated
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

export async function GET(req: NextRequest) {
  try {
    const headersList = headers()
    const token = headersList.get('token')
    if (!token) {
      return NextResponse.json({
        message: messages.error.notAuthorized
      }, {
        status: 400
      })
    }

    const IsTokenValid = jwt.verify(token, 'secretch@mos@S48=ov6.TD^q8F')
    //@ts-ignore
    const { data } = IsTokenValid

    const prisma = new PrismaClient()
    const totalUsers = await prisma.user.count();
    const adminCount = await prisma.user.count({
      where: {
        role: 'admin',
      },
    });
    const promoterCount = await prisma.user.count({
      where: {
        role: 'promoter',
      },
    });

    const allStats = {
      totalUsers,
      admin_count: adminCount,
      promoter_count: promoterCount,
    };

    const currentUser = await prisma.user.findUnique({
      where: { id: data.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            promoter_created: true,
            created_users: true
          }
        }
      }
    });

    const recentUserAdmins = await prisma.user.findMany({
      where: { role: 'admin' },
      orderBy: { created_at: 'desc' },
      take: 3,
    });

    // Obtener los 3 promotores más recientes
    const recentUserPromoters = await prisma.user.findMany({
      where: { role: 'promoter' },
      orderBy: { created_at: 'desc' },
      take: 3,
    });

    // Combinar los resultados en un solo objeto
    const recentUserData = {
      recentUsers: recentUserAdmins,
      recentPromoters: recentUserPromoters
    };

    const recentPromoters = await prisma.user.findMany({
      where: {
        role: 'promoter',
        promoters: {
          some: {}, // Esto asegura que el usuario esté relacionado con al menos un registro en Promoter
        },
      },
      orderBy: {
        created_at: 'desc', // Ordena por la fecha de creación en orden descendente
      },
      take: 3, // Limita los resultados a los 3 más recientes
      include: {
        promoters: true, // Incluye los datos de la tabla relacionada 'Promoter'
      },
    });
    console.log({
      user: [currentUser],
      stats: [allStats],
      recent: [recentUserData],
      recent_promoters: recentPromoters,
      messages: messages.success.userCreated
    }, "vemos")
    const response = NextResponse.json({
      user: [currentUser],
      stats: [allStats],
      recent: [recentUserData],
      recent_promoters: recentPromoters,
      messages: messages.success.userCreated
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

