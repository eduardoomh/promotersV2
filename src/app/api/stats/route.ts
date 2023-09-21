import { connectMongoDB } from '@/libs/mongodb'
import Promoter, { IPromoterSchema } from '@/models/Promoter'
import User from '@/models/User'
import { messages } from '@/utils/messages'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const response =  NextResponse.json({
            promoter: [],
            messages: messages.success.userCreated
        },{
            status: 200
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}

export async function GET(req: NextRequest){
    try{
        const headersList = headers()
        const token = headersList.get('token')
        if (!token) {
            return NextResponse.json({
                message: messages.error.notAuthorized
            }, {
                status: 400
            })
        }

        const IsTokenValid = jwt.verify(token, 'secretch@mos@')
        //@ts-ignore
        const { data } = IsTokenValid
        
        await connectMongoDB()
        const allStats = await User.aggregate([
            {
              $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                admin_count: {
                  $sum: {
                    $cond: { if: { $eq: ["$role", "admin"] }, then: 1, else: 0 }
                  }
                },
                promoter_count: {
                  $sum: {
                    $cond: { if: { $eq: ["$role", "promoter"] }, then: 1, else: 0 }
                  }
                }
              }
            }
          ])
          
       const currentUser = await User.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(data._id)
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "made_by",
                as: "promotores"
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "made_by",
                as: "usuarios"
              }
            },
            {
              $project: {
                _id: 1,
                name: 1, 
                email: 1, 
                role: 1,
                promotoresCount: { $size: "$promotores" },
                usuariosCount: { $size: "$usuarios" }
              }
            }
          ])


          const recentUsers = await User.aggregate([
            {
              $facet: {
                "recentUsers": [
                  { $match: { role: "admin" } },
                  { $sort: { createdAt: -1 } },
                  { $limit: 3 } 
                ],
                "recentPromoters": [
                  { $match: { role: "promoter" } }, 
                  { $sort: { createdAt: -1 } }, 
                  { $limit: 3 } 
                ]
              }
            },
            {
              $project: {
                _id: 0,
                recentUsers: 1,
                recentPromoters: 1
              }
            }
          ])
          
        const response =  NextResponse.json({
            user: currentUser,
            stats: allStats,
            recent: recentUsers,
            messages: messages.success.userCreated
        },{
            status: 200
        })
        return response
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: messages.error.default, error
        },{
            status: 500
        })
    }
}

