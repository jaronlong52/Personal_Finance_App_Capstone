// PieChart.js
import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { UsernameContext } from '../contexts/UsernameContext';
import './chartjspie.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels = [], dataPoints = [] }) => { // Default values to avoid undefined errors

    const { variable } = useContext(UsernameContext);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                backgroundColor: [
                    'aqua', 'red', 'blue', 'yellow', 'orange', 'purple', 'cadetblue',
                     'chartreuse', 'coral', 'darkgoldenrod', 'darkkhaki', 'darkseagreen',
                    ...dataPoints.slice(labels.length).map(() => `hsl(${Math.random() * 360}, 100%, 50%)`)
                ],
                borderColor: 'black',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className='chartjspie-pieChart'>
            <Pie data={data} options={options} height={200} width={200} style={{height: 300, width: 300}}/>
        </div>
    );
};

export default PieChart;
