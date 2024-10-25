import { messages } from "@/utils/messages"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const findSettings = await prisma.setting.findFirst({
            include: {
                woo_keys: true
            }
        })

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
        const prisma = new PrismaClient()
        //Get body
        const body = await req.json()
        //Call configurations
        const configurations = await prisma.setting.findFirst({
            include: {
                woo_keys: true
            }
        })
        if (!configurations) {
            return NextResponse.json({
                message: messages.error.default,
            }, {
                status: 200
            })
        }
        const { woo_keys: { client_id, client_secret, store_url } } = configurations
        //call woo api
        const WooApi = new WooCommerceRestApi({
            url: store_url,
            consumerKey: client_id,
            consumerSecret: client_secret,
            version: "wc/v3",
            queryStringAuth: true

        })
        //call initial log        
        const logCreated = await prisma.logs.create({
            data: {
                data: JSON.stringify(body),
            }
        });

        if (!logCreated) {
            return NextResponse.json({
                message: 'Ocurrio un error al guardar los datos',
            }, {
                status: 200
            })
        }

        if (body.status === 'pending') {
            return NextResponse.json({
                message: 'Pedido no habil para depositar comision',
            }, {
                status: 200
            })
        }


        if (body.status !== 'processing') {
            return NextResponse.json({
                message: 'Pedido no habil para depositar comision',
            }, {
                status: 200
            })
        }
        //Get coupon used of the order
        const coupons = body.coupon_lines
        //if have coupon continue to process
        if (coupons && coupons.length > 0) {
            //for each coupon
            for (let coupon of coupons) {
                //get the commission associated with the coupon
                const commission = await prisma.commission.findFirst({
                    where: {
                        coupon: {
                            coupon_id: coupon.meta_data[0].value.id,
                            code: coupon.meta_data[0].value.code
                        }
                    }
                })
                if (commission) {
                    try {
                        //Get the user and the promoter asociated with that commission
                        const userFound = await prisma.user.findUnique({
                            where: {
                                id: commission.user_id
                            }
                        })
                        const promoterFound = await prisma.promoter.findFirst({
                            where: {
                                user_id: commission.user_id
                            }
                        })
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
                            const newAmount = commission.earning_type === 'percentage' ?
                                Number(totalAmount) * Number(commission.earning_amount / 100) :
                                commission.earning_amount

                            const newPromoterBalance = Number(promoterFound.balance) + Number(newAmount)
                            //create the movement
                            await prisma.movement.create({
                                data: {
                                    user: {
                                        connect: { id: userFound.id },
                                    },
                                    promoter: {
                                        connect: { id: promoterFound.id },
                                    },
                                    amount: newAmount,
                                    type: 'payment',
                                    description: `Comisión pagada por pedido #${body.id}`,
                                    before_mod: promoterFound.balance,
                                    after_mod: newPromoterBalance,
                                    made_by:{
                                        connect: {
                                            id: process.env.WEBHOOK_DEFAULT_USER_MADE_BY
                                        }
                                    }
                                }
                            })
                            //success
                            await prisma.promoter.update({
                                where: {
                                    id: promoterFound.id
                                },
                                data: {
                                    balance: newPromoterBalance,
                                    updated_at: new Date()
                                }
                            })
                        }

                    } catch (error) {
                        console.log(error)
                        await prisma.logs.create({
                            data: {
                                data: JSON.stringify(error),
                            }
                        });
                    }
                } else {
                    console.log("no hay cupones")
                }
            }
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            log: logCreated
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