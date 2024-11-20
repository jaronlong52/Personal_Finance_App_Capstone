import './piecombiner.css'
import React, { useContext, useEffect, useState } from 'react';
import PieChart from './chartjspie';
import DataManager from './controlpie';
import axios from 'axios';
import { UsernameContext } from '../contexts/UsernameContext';

function FullPie() {
    const [data, setData] = useState([]);

    const {variable} = useContext(UsernameContext);

    const getBudget = () => {
        axios.post('http://localhost:8081/budget/getBudget', {username: variable})
        .then(res => {
            setData(res.data);
            console.log(res);
        });
    }

    const amounts = data.map(item => item.amount);
    const allLabels = data.map(item => item.label);

    useEffect(() => {
        getBudget();
      }, []);

    useEffect(() => {
        // This effect will run every time the `data` state changes
        if (data.length > 0) {
            const amounts = data.map(item => item.amount); // Extract amounts
            const allLabels = data.map(item => item.label); // Extract labels

            // Update dataPoints and labels state with new values
            setDataPoints(amounts);
            setLabels(allLabels);
        }
    }, [data]); // Runs when `data` changes
    
    const [dataPoints, setDataPoints] = useState(amounts);
    const [labels, setLabels] = useState(allLabels);

    return (
        <div className="combinedChart">
            <PieChart labels={labels} dataPoints={dataPoints} />
            <DataManager labels={labels} dataPoints={dataPoints} setLabels={setLabels} setDataPoints={setDataPoints} />
        </div>
    );
}

export default FullPie;