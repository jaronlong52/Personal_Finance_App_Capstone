import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const chartjspie = () => {
    const data = {
        labels: ['Housing', 'Food', 'Utilities', 'Savings', 'Transportation', 'Recreation'],
        datasets: [
            {
                data: [30,17,9,18,8,18],
                backgroundColor: ['aqua', 'red', 'blue', 'yellow', 'orange', 'purple']
            }
        ]
    }

    return (
        <div className='pie'>
            <div>
            </div>
           <div
           style = {
            {
                padding: '50px',
                width: '100%',
                
            }
           }>
            <Pie
            data = {data}>

            </Pie>
            </div> 
        </div>
    );
};

export default chartjspie;