import { connectMongoDB } from "@/libs/mongodb";
import Promoter from "@/models/Promoter";
import User, { IUserSchema } from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]

        const findUser = await User.findOne({_id: id})
        let existPromoter = undefined;
        let userStats = undefined;

        if(!findUser){
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }

        if(findUser.role === 'promoter'){
            existPromoter = await Promoter.findOne({user: findUser._id})
        }else{
            const madeByUsers = await User.find({made_by: findUser._id})
            const madeByPromoters = await Promoter.find({made_by: findUser._id}).populate('user')

            userStats = {
                users: madeByUsers,
                promoters: madeByPromoters
            }

        }
        
        //@ts-ignore
        const {password, ...rest} = findUser._doc

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
        await connectMongoDB()
       const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]

        const findUser: IUserSchema | null = await User.findOne({ _id: id })

        if (!findUser) {
            return NextResponse.json({
                message: 'El usuario no existe',
            }, {
                status: 500
            })
        }

        const { name, email } = await req.json()
        const updateUser = await User.updateOne({ _id: id }, {
            $set: {
                name,
                email,
                updated_at: Date.now()
            }
        })

        if (updateUser.modifiedCount < 1) {
            return NextResponse.json({
                message: 'El usuario no pudo ser actualizado',
            }, {
                status: 500
            })
        }
        const updatedUser: IUserSchema | null = await User.findById(id);

        if (!updatedUser) {
            return NextResponse.json({
                message: 'El usuario no pudo ser actualizado',
            }, {
                status: 500
            })
        }
        //@ts-ignore
        const { password, ...rest } = updatedUser._doc

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
        await connectMongoDB()
        const { pathname } = new URL(req.url)
        const id = pathname.split('/api/users/')[1]

        const findUser = await User.findOne({_id: id})
        if(!findUser){
            return NextResponse.json({
                message: 'El usuario no existe',
            }, {
                status: 500
            })
        }

        const deleteUser = await User.deleteOne({ _id: id })
        if (deleteUser.deletedCount < 1) {
            return NextResponse.json({
                message: 'El usuario no pudo ser eliminado',
            }, {
                status: 500
            })
        }

        //check if exist promoter with the same id
        const deletePromoter = await Promoter.findOne({ user: id })

        if (deletePromoter) {
            const deletePromoter = await Promoter.deleteOne({ user: id })
            if (deletePromoter.deletedCount < 1) {
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
