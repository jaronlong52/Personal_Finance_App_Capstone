import React, { useState } from 'react';
import './Income.css';

function Income() {
    const [data, setData] = useState([
        { Date: '10/04/24', Amount: 1600, Comments: 'Weekly salary'},
        { Date: '10/09/24', Amount: 400, Comments: 'Side hustle'},
        { Date: '10/11/24', Amount: 1600, Comments: 'Weekly salary'},
    ]);

    return (
        <div className="container">
            <div className="inputs">
                <input className="input" type="date" placeholder='date' />
                <input className="input" type="amount" placeholder='Amount' />
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
                                <td>{item.Date}</td>
                                <td>{item.Amount}</td>
                                <td>{item.Comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default Income
