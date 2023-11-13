'use client'
import moment from "moment"
import { FC } from "react"

interface props{
    date: string;
}
const DateItem: FC<props> = ({ date }) => {
    return (
        <p>{date ? moment(date).format('DD/MM/YYYY') : 'cargando..'}</p>
    )
}

export default DateItem