import React from 'react'
import styled from 'styled-components'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js"

import { Line } from "react-chartjs-2"
import { useGlobalContext } from '../../Context/globalContext'
import { dateFormat } from '../../Utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export default function Chart() {
    const { incomes, expenses } = useGlobalContext();
    incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
    const data = {
        labels: incomes.map((income) => {
            return dateFormat(income.date)

        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}
const ChartStyled = styled.div`
    background:var(--color-accent2);
    border:2px solid #FFFFFF;
    box-shadow:var(--box-shadow);
    padding:1rem;
    border-radius:20px;
    height:100%;
    
`