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
    ]

    const getTotalIncome = () => {
        axios.post('http://localhost:8081/income/getTotal', {username: variable})
        .then(res => {
          console.log(res)
          const data = res.data;
          const object = data[0];
          setTotalIncome(object.income);
          setBalance(Number(object.income) - Number(object.payment));
        });
    }

    const getRecords = () => {
        axios.post('http://localhost:8081/income/getRecords', {username: variable, pastDate: pastDate,})
        .then(res => {
          console.log(res)
          setData(res.data);
        });
    }

    const inputRecord = () => {
        const total = Number(amount) + Number(totalIncome);
        axios.post('http://localhost:8081/income/inputRecord', {username: variable, date: date, amount: amount, comments: comments, total: total})
        .then(res => {
          console.log(res);
        });
        setDate('');
        setAmount('');
        setComments('');
    }

    const dropdown = (e) => {
        setSelected(e.target.value);
        switch(e.target.value) {
            case 'Today':
                setPastDate(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
                break;
            case '1 Week':
                past.setDate(currentDate.getDate() - 7);
                setPastDate(`${past.getFullYear()}-${past.getMonth()+1}-${past.getDate()}`);
                break;
            case '2 Weeks':
                past.setDate(currentDate.getDate() - 14);
                setPastDate(`${past.getFullYear()}-${past.getMonth()+1}-${past.getDate()}`);
                break;
            case '1 Month':
                past.setDate(currentDate.getDate() - 30);
                setPastDate(`${past.getFullYear()}-${past.getMonth()+1}-${past.getDate()}`);
                break;
            case '3 Months':
                past.setDate(currentDate.getDate() - 90);
                setPastDate(`${past.getFullYear()}-${past.getMonth()+1}-${past.getDate()}`);
                break;
            default:
                setPastDate(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
        }
    }

    useEffect(() => {
        getRecords();
    }, [date]);

    useEffect(() => {
        getTotalIncome();
    }, [amount]);

    return (
        <div className="income-container">
            <h3>Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>
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
                <button className='income-get-records' onClick={getRecords}>Get Records</button>
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
