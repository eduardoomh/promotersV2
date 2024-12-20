'use client'
import { IMovementSchema } from "@/models/Movement"
import { Col, DatePicker, Row } from "antd"
import moment from "moment"
import { FC, useEffect, useState } from "react"

interface props {
    movements: IMovementSchema[]
}
const AccountState: FC<props> = ({ movements }) => {
    const [value, setValue] = useState<any>([
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().endOf('month').format('YYYY-MM-DD')
    ])
    const [filteredMovements, setFilteredMovements] = useState<IMovementSchema[]>([])
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';

    const filterMovementsByDateRange = (movements: IMovementSchema[], startDate: string, endDate: string) => {
        return movements.filter((el) => {
            const movementDate = moment(el.created_at);
            return movementDate.isSameOrAfter(startDate) && movementDate.isSameOrBefore(endDate);
        });
    };

    const sumAllMovements = () =>{
        let total = 0
        filteredMovements.map(el => {
            if(el.type === 'discount'){
                total = total - el.amount
            }else{
                total = total + el.amount
            }
        })

        return total
    }

    useEffect(() => {
        setFilteredMovements(filterMovementsByDateRange(movements, value[0], value[1]).reverse())
    }, [value])

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <RangePicker
                    style={{ width: '50%', display: 'flex', justifyContent: 'center' }}
                    onChange={(val: any) => setValue([moment(val[0].$d).format('YYYY-MM-DD'), moment(val[1].$d).add(1, 'days').format('YYYY-MM-DD')])}
                    format={dateFormat}
                />
            </Col>
            {
                filteredMovements.length > 0 ? (
                    <>
                        <Col span={24}>
                            <br/>
                            <hr/>
                            {
                                filteredMovements && filteredMovements.length > 0 && filteredMovements.map((movement: IMovementSchema) => (
                                    <article key={movement.id}>
                                        <div style={{ display: 'flex' }}>
                                            <section style={{ width: '100%' }}>
                                                <p><strong>Concepto: </strong> {movement.description} </p>
                                                <p><strong>Fecha: </strong> {moment(movement.created_at).format('DD/MM/YYYY')}</p>
                                            </section>
                                            <section style={{
                                                width: '18rem',
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end',
                                                flexDirection: 'column'
                                            }}>
                                                <p style={{ fontSize: '0.9rem', color: 'gray' }}>Anterior: ${movement.before_mod} mxn </p>
                                                <p style={{ fontSize: '0.9rem', color: 'gray' }}>Posterior: ${movement.after_mod} mxn </p>
                                                <br/>
                                                <p style={{ fontSize: '1.2rem', color: movement.type === 'discount' ? 'red' : 'black' }}>
                                                {movement.type === 'discount' ? 'Descontado:' : 'Depositado:'} {movement.type === 'discount' ? '-' : ''}${movement.amount} mxn </p>
                                            </section>
                                        </div>
                                        <hr />
                                    </article>
                                ))
                            }
                            <article style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', fontSize: '1.4rem' }}>
                                <section style={{ width: '100%' }}>
                                    <p><strong>Suma Total:</strong></p>
                                </section>
                                <section style={{ width: '12rem', display: 'flex', justifyContent: 'center' }}>
                                    <p><strong>${sumAllMovements()} mxn</strong></p>
                                </section>
                            </article>
                        </Col>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '4rem' }}>
                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            No hay datos por mostrar
                        </p>

                    </div>
                )
            }

        </Row>
    )
}

export default AccountState





