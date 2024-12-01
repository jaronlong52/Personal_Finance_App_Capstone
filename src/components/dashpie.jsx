import React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'

const dashpie = () => {
    const data = [
        { source: 'Salary', amount: 5000 },
        { source: 'Freelance', amount: 1200 },
        { source: 'Sold Car', amount: 800 },
    ];

    return (
        <div className='pie'>
            <PieChart width ={400} height={400}>
                <Pie
                    dataKey = "value"
                    isAnimationActive ={false}
                    data = {data}
                    cx= {200}
                    cy= {200}
                    outerRadius={80}
                    fill='blue'
                    label
                />
                <Tooltip enabled = {true}>
                </Tooltip>
            </PieChart>
        </div>
    );
};

export default dashpie;