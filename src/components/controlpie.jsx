// DataManager.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UsernameContext } from '../contexts/UsernameContext';
import './controlpie.css';
import ValueChangerPopup from './budgetPopup';

const DataManager = ({ labels, dataPoints, setLabels, setDataPoints }) => {
    const [newLabel, setNewLabel] = useState('');
    const [newData, setNewData] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [amountBudgeted, setAmountBudgeted] = useState('');

    const { variable } = useContext(UsernameContext);

    const addPoint = (nwLabel, nwPoint) => {
        axios.post('http://localhost:8081/budget/setBudget', {username: variable, labels: nwLabel, dataPoints: nwPoint})
        .then(res => {
            console.log(res);
        })
    }

    const deletePoint = (labelToRm, pointToRm) => {
        axios.post('http://localhost:8081/budget/delBudget', {username: variable, label: labelToRm, dataPoint: pointToRm})
        .then(res => {
            console.log(res);
        })
    }

    const getMonthlyIncome = () => {
        axios.post('http://localhost:8081/controlpie/getMonthlyIncome', {username: variable})
        .then(res => {
            const data = res.data;
            const object = data[0];
            if (isNaN(object.monthlyIncome) === false) {
                setMonthlyIncome(object.monthlyIncome);
            }
        })
    }

    useEffect(() => {
        const totalBudgeted = dataPoints.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAmountBudgeted(totalBudgeted);
    }, [dataPoints]);

    // Function to add a new data point to the pie chart
    const addDataPoint = () => {
        // Trim whitespace and check if the new label is unique
        if (newLabel.trim() !== "" && !labels.includes(newLabel.trim())) {
            const numericValue = Number(newData);
            // Check if numeric value is valid and greater than 0
            if (!isNaN(numericValue) && numericValue > 0) {
                // Update the labels and dataPoints states
                setLabels((prevLabels) => [...prevLabels, newLabel.trim()]);
                setDataPoints((prevDataPoints) => [...prevDataPoints, numericValue]);
                addPoint(newLabel, numericValue);
                // Reset input fields
                setNewLabel('');
                setNewData('');
            }
        }
    };

    // Function to remove a data point from the pie chart
    const removeDataPoint = (index) => {
        const newLabels = labels.filter((_, i) => i !== index);
        const newDataPoints = dataPoints.filter((_, i) => i !== index);
        // Update the states with new values
        let label1 = labels.filter((_, i) => i === index);
        let label2 = dataPoints.filter((_, i) => i === index);
        deletePoint(label1, label2);
        setLabels(newLabels);
        setDataPoints(newDataPoints);
    };

    useEffect(() => {
        getMonthlyIncome();
    }, []);

    const handleValueChange = (newValue) => {
        setMonthlyIncome(newValue);
    };

    const budgetStatusClass = amountBudgeted < monthlyIncome ? 'controlpie-amount-budgeted-green' : 'controlpie-amount-budgeted-red';

    return (
        <div className="controlpie-container">
            <div className='controlpie-monthly-info'>
                <h2 className='controlpie-dataManager-title'>Monthly Budget Manager</h2>
                <hr className='controlpie-divider'/>
                <div className='controlpie-monthly-update'>
                    <h3 className='controlpie-monthlyIncome-title'>Monthly Income: ${monthlyIncome}</h3>
                    <div className='controlpie-popup'><ValueChangerPopup currentValue={monthlyIncome} onValueChange={handleValueChange} /></div>
                </div>
                <h3 className={`controlpie-amount-budget-title ${budgetStatusClass}`}>
                    Amount Budgeted: ${amountBudgeted} / ${monthlyIncome}
                </h3>
            </div>
            <hr className='controlpie-divider'/>
            <div className="controlpie-inputs">
                <input
                    className="controlpie-label"
                    type="text"
                    placeholder="Label"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                />
                <input
                    className="controlpie-amount"
                    type="number"
                    placeholder="$"
                    value={newData}
                    onChange={(e) => setNewData(e.target.value)}
                />
                <button 
                    className="controlpie-add-button"
                    onClick={addDataPoint} 
                    disabled={newLabel.trim() === "" || !newData || isNaN(Number(newData)) || Number(newData) <= 0}
                >
                    Add Piece
                </button>
            </div>
            <div className='controlpie-data-body'>
                <ul className='controlpie-data-labels'>
                    {labels.map((label, index) => (
                        <li key={index} className='controlpie-list-items'>
                            <span>{label} - ${dataPoints[index]}</span>
                            <button className='controlpie-remove-button' onClick={() => removeDataPoint(index)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DataManager;
