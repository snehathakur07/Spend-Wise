import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import Form from './IncomeForm';
import { useGlobalContext } from '../../Context/globalContext';
import Item from '../Item/Item';


export default function Incomes() {
    const { incomes, getIncomes, deleteIncome,totalIncome} = useGlobalContext();
    useEffect(() => {
        getIncomes();
    }, [])

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className='total-income'>
                    Total Income: <span>${totalIncome()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description } = income;
                            return <Item
                                key={_id}
                                id={_id}
                                title={title}
                                date={date}
                                amount={amount}
                                category={category}
                                description={description}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                                type='income'
                            />
                        })
                        }
                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    )
}

const IncomesStyled = styled.div`

    display:flex;
    overflow:auto;
    .total-income{
        display:flex;
        justify-content:center;
        align-items:center;
        background:#FCF6F9;
        border:2px solid #FFFFFF;
        box-shadow:var(--box-shadow);
        border-radius:20px;
        padding:1rem;
        margin:1rem 0;
        font-size:2rem;
        gap:.5rem;
        span{
            font-size:2.5rem;
            font-weight:800;
            color:var(--color-green);
        }
    }
    .income-content{
        display:flex;
        gap:2rem;
        .incomes{
            flex:1;
        }
    }

`