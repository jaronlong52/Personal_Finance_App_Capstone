import React, { useContext, useState } from 'react';
import './Income.css';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Income = () => {
    const { variable, setVariable } = useContext(UsernameContext);
    const [data, setData] = useState([]);

    const currentDate = new Date();
    const today = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [comments, setComments] = useState('');

    function getRecords() {
        axios.post('http://localhost:8081/income', {username: variable,})
        .then(res => {
          console.log(res)
          setData(res.data);
        });
    };

    // for dropdown menu
    const [selected, setSelected] = useState('');
    const options = [
        { value: 'Today', label: 'Today'},
        { value: '1 Week', label: '1 Week'},
        { value: '2 Weeks', label: '2 Weeks'},
        { value: '1 Month', label: '1 Month'},
        { value: '3 Months', label: '3 Months'},
    ]

    const dropdown = (e) => {
        setSelected(e.target.value);

    }

    return (
        <div className="container">
            <button className='get-records' onClick={getRecords}>Get Records</button>
            <div className="income-inputs">
                <input className="income-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <input className="income-input" value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
                <input className="comments" value={comments} placeholder='Comments' onChange={(e) => setComments(e.target.value)}/>
                <button className='income-submit'>Submit</button>
            </div>
            <select 
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
            <table className="income-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount ($)</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
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
