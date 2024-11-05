import './piecombiner.css'
import React, { useState } from 'react';
import PieChart from './chartjspie';
import DataManager from './controlpie';

function FullPie() {
    const [dataPoints, setDataPoints] = useState([30, 17, 9, 18, 8, 18]);
    const [labels, setLabels] = useState(['Housing', 'Food', 'Utilities', 'Savings', 'Transportation', 'Recreation']);

    return (
        <div className="combinedChart">
            <PieChart labels={labels} dataPoints={dataPoints} />
            <DataManager labels={labels} dataPoints={dataPoints} setLabels={setLabels} setDataPoints={setDataPoints} />
        </div>
    );
}

export default FullPie;