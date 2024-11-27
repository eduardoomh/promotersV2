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
                data: JSON.stringify({
                    id: body.id,
                    status: body.status,
                    date_created: body.date_created,
                    date_modified: body.date_modified
                }),
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

        const movementFound = await prisma.movement.findFirst({
            where:{
                description: `Comisión pagada por pedido #${body.id}`
            }
        })

        if(movementFound){
            await prisma.logs.create({
                data: {
                    data: JSON.stringify({
                        id: body.id,
                        status: body.status,
                        description: "La comisión del pedido ya ha sido realizada",
                        date_created: body.date_created,
                        date_modified: body.date_modified
                    }),
                }
            });
            return NextResponse.json({
                message: 'La comisión del pedido ya ha sido realizada',
            }, {
                status: 200
            })          
        }

        const order_request = await WooApi.get(`orders/${body.id}`);

        if(order_request?.status !== 200){
            return NextResponse.json({
                message: 'No se ha encontrado el pedido solicitado',
            }, {
                status: 200
            })
        }

        const order = order_request.data

        //Get coupon used of the order
        const coupons = order.coupon_lines
        const movements_created: any = [];

        //if have coupon continue to process
        if (coupons && coupons.length > 0) {
            //for each coupon
            for (let coupon of coupons) {
                //get the commission associated with the coupon
                const commissions = await prisma.commission.findMany({
                    where: {
                        coupon: {
                            coupon_id: `${JSON.parse(coupon.meta_data[0].value)[0]}`,
                            code: JSON.parse(coupon.meta_data[0].value)[1]
                        }
                    }
                })
                if (commissions) {
                    for(let commission of commissions){
                        try {
                            //Get the user and the promoter asociated with that commission
                            const userFound = await prisma.user.findUnique({
                                where: {
                                    id: commission.user_id
                                },
                                include:{                 
                                    promoters: true,
                                }
                            })
    
                            //get the all data of the coupon
                            const couponFind = await WooApi.get(`coupons/${JSON.parse(coupon.meta_data[0].value)[0]}`);
                            //get the products assocciated with the coupon
                            const coupon_products = couponFind.data.product_ids.map((el: any) => Number(el))
                            //for each product in the order evaluates the product exists in the coupon rules and returns an array
                            //with the total amounts
    
                            let totalAmount = 0
                            order.line_items.map((el: any) => {
                                if (coupon_products.includes(Number(el.product_id))) {
                                    totalAmount += Number(el.total) * el.quantity
                                }
                            })
                            //continue
                            if (userFound && userFound.promoters) {
                                //sum balance
                                const newAmount = commission?.earning_type === 'percentage' ?
                                    Number(totalAmount) * Number(commission.earning_amount / 100) :
                                    commission?.earning_amount
    
                                const newPromoterBalance = Number(userFound.promoters[0].balance) + Number(newAmount)
                                //create the movement
                               let new_movement = await prisma.movement.create({
                                    data: {
                                        user: {
                                            connect: { id: userFound.id },
                                        },
                                        promoter: {
                                            connect: { id: userFound.promoters[0].id },
                                        },
                                        amount: newAmount,
                                        type: 'payment',
                                        description: `Comisión pagada por pedido #${body.id}`,
                                        before_mod: userFound.promoters[0].balance,
                                        after_mod: newPromoterBalance,
                                        made_by:{
                                            connect: {
                                                id: process.env.WEBHOOK_DEFAULT_USER_MADE_BY
                                            }
                                        }
                                    }
                                })
                                movements_created.push(new_movement)
                                //success
                                await prisma.promoter.update({
                                    where: {
                                        id: userFound.promoters[0].id
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
                    }
                } else {
                    console.log("no hay cupones")
                }
            }
        }

        const response = NextResponse.json({
            message: 'Los ajustes se ha actualizado',
            movement: movements_created,
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