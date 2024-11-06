import './piecombiner.css'
import React, { useState } from 'react';
import PieChart from './chartjspie';
import DataManager from './controlpie';

function FullPie() {
    const getBudget = () => {
        axios.post('http://localhost:8081/income/getBudget', {username: 'testUsername'})
        .then(res => {
            console.log(res)
            setData(res.data);
        });
    }
    
    const [dataPoints, setDataPoints] = useState(data.map(item => item.amount));
    const [labels, setLabels] = useState(data.map(item => item.label));

    return (
        <div className="combinedChart">
            <PieChart labels={labels} dataPoints={dataPoints} />
            <DataManager labels={labels} dataPoints={dataPoints} setLabels={setLabels} setDataPoints={setDataPoints} />
        </div>
    );
}

export default FullPie;