import React, { useContext, useState } from 'react';
import './Income.css';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Income = () => {
    const { variable, setVariable } = useContext(UsernameContext);

    function getRecords() {
        axios.post('http://localhost:8081/income', {username: variable,})
        .then(res => {
          console.log(res)
          setData(res.data);
        });
    };

    const [data, setData] = useState([]);

    // const [data, setData] = useState([
    //     { Date: '10/04/24', Amount: 1600, Comments: 'Weekly salary'},
    //     { Date: '10/09/24', Amount: 400, Comments: 'Side hustle'},
    //     { Date: '10/11/24', Amount: 1600, Comments: 'Weekly salary'},
    // ]);

    return (
        <div className="container">
            <button className='get-records' onClick={getRecords}>Get Records</button>
            <div className="income-inputs">
                <input className="income-input" type="date" placeholder='date' />
                <input className="income-input" type="amount" placeholder='Amount' />
                <input className="comments" type="comments" placeholder='Comments' />
                <button className='income-submit'>Submit</button>
            </div>
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
