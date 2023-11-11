import { connectMongoDB } from "@/libs/mongodb"
import Commission from "@/models/Comissions"
import Logs from "@/models/Logs"
import Movement, { IMovementSchema } from "@/models/Movement"
import Promoter from "@/models/Promoter"
import Settings, { ISettingSchema } from "@/models/Settings"
import User, { IUserSchema } from "@/models/User"
import { messages } from "@/utils/messages"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const findSettings: ISettingSchema | null = await Settings.findOne()

        if (!findSettings) {
            return NextResponse.json({
                message: 'Los ajustes no han sido encontrados',
            }, {
                status: 500
            })
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
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
export async function POST(req: NextRequest) {
    try {
        //WEBHOOK
        await connectMongoDB()
        //Get body
        const body = await req.json()
        //Call configurations
        const configurations = await Settings.find()
        if (!configurations) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 500
            })
        }
        const { woo_keys: { client_id, client_secret, store_url } } = configurations[0]
        //call woo api
        const WooApi = new WooCommerceRestApi({
            url: store_url,
            consumerKey: client_id,
            consumerSecret: client_secret,
            version: "wc/v3",
            queryStringAuth: true

        })
        //call initial log
        const createLog = await Logs.create({
            data: JSON.stringify(body)
        })

        if (!createLog) {
            return NextResponse.json({
                message: 'Ocurrio un error al guardar los datos',
            }, {
                status: 500
            })
        }
        //Get coupon used of the order
        const coupons = body.coupon_lines
        //if have coupon continue to process
        if (coupons && coupons.length > 0) {
            //for each coupon
            for (let coupon of coupons) {
                //get the commission associated with the coupon
                const commission = await Commission.findOne({ "coupon.id": coupon.meta_data[0].value.id, "coupon.code": coupon.meta_data[0].value.code })
                if (commission) {
                    try {
                        //Get the user and the promoter asociated with that commission
                        const userFound = await User.findOne({ _id: commission.user })
                        const promoterFound = await Promoter.findOne({ user: commission.user })
                        //get the all data of the coupon
                        const couponFind = await WooApi.get(`coupons/${coupon.meta_data[0].value.id}`);
                        //get the products assocciated with the coupon
                        const coupon_products = couponFind.data.product_ids.map((el: any) => Number(el))
                        //for each product in the order evaluates the product exists in the coupon rules and returns an array
                        //with the total amounts
                        let totalAmount = 0
                        body.line_items.map((el: any) => {
                            if (coupon_products.includes(Number(el.product_id))) {
                                totalAmount += Number(el.total) * el.quantity
                            }
                        })
                        //continue
                        if (userFound && promoterFound) {
                            //sum balance
                            const newAmount = commission.earnings.type === 'percentage' ?
                                Number(totalAmount) * Number(commission.earnings.amount / 100) :
                                commission.earnings.amount

                            const newPromoterBalance = Number(promoterFound.balance) + Number(newAmount)
                            //create the movement
                           const movement = new Movement({
                                user: userFound._id,
                                promoter: promoterFound._id,
                                amount: newAmount,
                                type: 'payment',
                                description: `Comisión pagada por pedido #${body.id}`,
                                security: {
                                    before_mod: promoterFound.balance,
                                    after_mod: newPromoterBalance
                                },
                                made_by: '650c8e1d0b4ae5ac87db3f6f'
                            })
                            //success
                            await movement.save()
                            await Promoter.updateOne({ _id: promoterFound._id }, {
                                $set: {
                                    balance: newPromoterBalance
                                }
                            })
                        }

                    } catch (error) {
                        console.log(error)
                        await Logs.create({
                            data: JSON.stringify(error)
                        })
                    }
                }
            }
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            log: createLog
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