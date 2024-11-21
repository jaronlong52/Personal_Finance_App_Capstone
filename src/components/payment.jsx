import React, { useContext, useEffect, useState } from 'react';
import './payment.css';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Payment = () => {
    const { variable } = useContext(UsernameContext);
    const [data, setData] = useState([]);

    const currentDate = new Date();
    var past = new Date(currentDate);
    const [pastDate, setPastDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [comments, setComments] = useState('');

    const [balance, setBalance] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    // for dropdown menu
    const [selected, setSelected] = useState('');
    const options = [
        { value: 'Today', label: 'Today'},
        { value: '1 Week', label: '1 Week'},
        { value: '2 Weeks', label: '2 Weeks'},
        { value: '1 Month', label: '1 Month'},
        { value: '3 Months', label: '3 Months'},
    ]

    const getTotalPayment = () => {
        axios.post('http://localhost:8081/income/getTotal', {username: variable})
        .then(res => {
          console.log(res)
          const data = res.data;
          const object = data[0];
          setBalance(Number(object.income) - Number(object.payment));
          setTotalPayment(object.payment);
        });
    }

    const getRecords = () => {
        axios.post('http://localhost:8081/payment/getRecords', {username: variable, pastDate: pastDate,})
        .then(res => {
          console.log(res)
          setData(res.data);
        });
    }

    const inputRecord = () => {
        const total = Number(totalPayment) + Number(amount);
        axios.post('http://localhost:8081/payment/inputRecord', {username: variable, date: date, amount: amount, comments: comments, total: total})
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
        getTotalPayment();
    }, [amount]);

    return (
        <div className="payment-container">
            <h3>Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>
            <div className="payment-inputs">
                <input className="payment-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <input className="payment-input" value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
                <input className="payment-comments" value={comments} placeholder='Comments' onChange={(e) => setComments(e.target.value)}/>
                <button className='payment-submit' onClick={inputRecord}>Submit</button>
            </div>
            <div className='payment-display'>
                <select className='payment-dropdown-class'
                name="payment-dropdown" 
                id="payment-dropdown" 
                value={selected} 
                onChange={dropdown}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button className='payment-get-records' onClick={getRecords}>Get Records</button>
            </div>
            <table className="payment-table">
                    <thead>
                        <tr>
                            <th className='payment-table-date'>Date (yyyy-mm-dd)</th>
                            <th className='payment-table-amount'>Amount ($)</th>
                            <th className='payment-table-comments'>Comments</th>
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

export default Payment
