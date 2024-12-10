import React, { useContext, useEffect, useState } from 'react';
import './Income.css';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Income = () => {
    const { variable } = useContext(UsernameContext);
    const [data, setData] = useState([]);

    const currentDate = new Date();
    var past = new Date(currentDate);
    const [pastDate, setPastDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [comments, setComments] = useState('');

    const [balance, setBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    // for dropdown menu
    const [selected, setSelected] = useState('');
    const options = [
        { value: 'Today', label: 'Today'},
        { value: '1 Week', label: '1 Week'},
        { value: '2 Weeks', label: '2 Weeks'},
        { value: '1 Month', label: '1 Month'},
        { value: '3 Months', label: '3 Months'},
        { value: 'All Time', label: 'All Time'},
    ]

    const getTotalIncome = () => {
        axios.post('http://localhost:8081/income/getTotal', {username: variable})
        .then(res => {
            const data = res.data;
            const object = data[0];
            if (isNaN(object.income) === false && isNaN(object.payment) === false) {
                setTotalIncome(object.income);
                setBalance((Number(object.income) - Number(object.payment)).toFixed(2));
          }
        });
    }

    const getRecords = () => {
        axios.post('http://localhost:8081/income/getRecords', {username: variable, pastDate: pastDate,})
        .then(res => {
          setData(res.data);
        });
    }

    const inputRecord = () => {
        const total = Number(amount) + Number(totalIncome);
        axios.post('http://localhost:8081/income/inputRecord', { username: variable, date: date, amount: amount, comments: comments, total: total })
            .then(res => {
                setDate('');
                setAmount('');
                setComments('');
                getRecords();
            })
            .catch(err => {
                console.error("Error adding record:", err);
            });
    }
    
    const dropdown = (e) => {
        setSelected(e.target.value);
        const newPast = new Date(currentDate);
        switch(e.target.value) {
            case 'Today':
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            case '1 Week':
                newPast.setDate(currentDate.getDate() - 7);
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            case '2 Weeks':
                newPast.setDate(currentDate.getDate() - 14);
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            case '1 Month':
                newPast.setDate(currentDate.getDate() - 30);
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            case '3 Months':
                newPast.setDate(currentDate.getDate() - 90);
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            case 'All Time':
                newPast.setDate(currentDate.getDate() - 10000);
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
                break;
            default:
                setPastDate(`${newPast.getFullYear()}-${newPast.getMonth() + 1}-${newPast.getDate()}`);
        }
    }

    useEffect(() => {
        getRecords();
    }, [pastDate]);

    useEffect(() => {
        getTotalIncome();
    }, [amount]);

    return (
        <div className="income-container">
            <h3 className='current-balance' style={{background: balance < 0 ? "#db3737" : "#448633"}}>Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>
            <div className="income-inputs">
                <input className="income-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <input className="income-input" value={amount} placeholder='$' onChange={(e) => setAmount(e.target.value)}/>
                <input className="income-comments" value={comments} placeholder='Comments' onChange={(e) => setComments(e.target.value)}/>
                <button className='income-submit' onClick={inputRecord}>Add Record</button>
            </div>
            <div className='income-display'>
                <select className='income-dropdown-class'
                name="income-dropdown" 
                id="income-dropdown" 
                value={selected} 
                onChange={dropdown}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <table className="income-table">
                    <thead>
                        <tr>
                            <th className='income-table-date'>Date (yyyy-mm-dd)</th>
                            <th className='income-table-amount'>Amount ($)</th>
                            <th className='income-table-comments'>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date.slice(0,-14)}</td>
                                <td>{item.amount}</td>
                                <td>{item.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default Income
