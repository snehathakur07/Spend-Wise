import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../Context/globalContext';
import Item from "../Item/Item"
import ExpenseForm from './ExpenseForm';


export default function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpense } = useGlobalContext();
    useEffect(() => {
        getExpenses();
    }, [])

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className='total-expense'>
                    Total expense: <span>${totalExpense()}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm/>
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description } = expense;
                            return <Item
                                key={_id}
                                id={_id}
                                title={title}
                                date={date}
                                amount={amount}
                                category={category}
                                description={description}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                type='expense'
                            />
                        })
                        }
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    )
}

const ExpensesStyled = styled.div`

    display:flex;
    overflow:auto;
    .total-expense{
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
    .expense-content{
        display:flex;
        gap:2rem;
        .expenses{
            flex:1;
        }
    }

`