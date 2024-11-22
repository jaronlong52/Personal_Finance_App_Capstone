// DataManager.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UsernameContext } from '../contexts/UsernameContext';
import './controlpie.css';

const DataManager = ({ labels, dataPoints, setLabels, setDataPoints }) => {
    const [newLabel, setNewLabel] = useState('');
    const [newData, setNewData] = useState('');
    const [tData, setTData] = useState([]);

    const { variable } = useContext(UsernameContext);

    const addPoint = (nwLabel, nwPoint) => {
        console.log("newLabel:", nwLabel);
        console.log("nwPoint:", nwPoint);
        axios.post('http://localhost:8081/budget/setBudget', {username: variable, labels: nwLabel, dataPoints: nwPoint})
        .then(res => {
            setTData(res.data)
        })
    }

    const deletePoint = (labelToRm, pointToRm) => {
        console.log("labelToRm: ", labelToRm);
        console.log("pointToRm: ", pointToRm);
        axios.post('http://localhost:8081/budget/delBudget', {username: variable, label: labelToRm, dataPoint: pointToRm})
        .then(res => {
            console.log(res);
        })
    }
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

    return (
        <div className="controlpie-container">
            <h3>Add Data Point</h3>
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
