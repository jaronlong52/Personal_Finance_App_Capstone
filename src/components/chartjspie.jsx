// PieChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels = [], dataPoints = [] }) => { // Default values to avoid undefined errors
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
        <div className='pieChart' style={{paddingLeft: '200px', paddingRight: '100px', width: '500px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
