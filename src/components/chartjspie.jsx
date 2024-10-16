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
        labels: ['one', 'two', 'three'],
        datasets: [
            {
                data: [3,4,5],
                backgroundColor: ['aqua', 'red', 'blue']
            }
        ]
    }

    return (
        <div className='pie'>
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