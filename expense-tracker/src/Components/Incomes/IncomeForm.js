import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from '../../Context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../Utils/icons'

export default function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    })
    const { title, amount, date, description, category } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }
    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error} !</p>}
            <div className="input-control">
                <input type="text" placeholder="Income"
                    value={title}
                    name={'title'}
                    id="title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input type="number" placeholder="Income Amount"
                    value={amount}
                    name={'amount'}
                    id="amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter a Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date })
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description"
                    value={description}
                    placeholder='Add A Reference'
                    id="description" cols="30" rows="4"
                    onChange={handleInput('description')}>
                </textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={"Add Income"}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad='30px'
                    bg={'var(--color-accent'}
                    color={"#fff"}
                />
            </div>
        </FormStyled>
    )
}
const FormStyled = styled.form`
display: flex;
flex-direction: column;
gap: 2rem;
input, textarea, select{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: var(--box-shadow);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color:var(--primary-color2);
    }
}
.input-control{
    input{
        width:100%;
    }
}
.selects{
    display:flex;
    justify-content:flex-end;
    select{
        color:var(--primary-color3);
        &:focous, &:active{
            color:var(--primary-color);
        }
    }
}
.submit-btn{
    button{
        box-shadow:var(--box-shadow);
        cursor:pointer;
        &:hover{
            background:var(--color-green) !important;
        }
    }
}
`