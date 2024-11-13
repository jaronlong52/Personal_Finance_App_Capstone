// DataManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataManager = ({ labels, dataPoints, setLabels, setDataPoints }) => {
    const [newLabel, setNewLabel] = useState('');
    const [newData, setNewData] = useState('');
    const tData = useState([]);

    const addPoint = (nwLabel, nwPoint) => {
        axios.post('http://localhost:8081/budget/setBudget', {username: 'testUsername', labels: nwLabel, dataPoints: nwPoint})
        .then(res => {
            tData(res.data)
        })
    }

    const deletePoint = (labelToRm, pointToRm) => {
        axios.post('http://localhost:8081/budget/setBudget', {username: 'testUsername', label: labelToRm, dataPoint: pointToRm})
        .then(res => {
            tData(res.data)
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
        deletePoint(labels.filter((_, i) => i !== index), dataPoints.filter((_, i) => i !== index))
        setLabels(newLabels);
        setDataPoints(newDataPoints);
    };

    return (
        <div style={{ margin: '20px', width: '300px' }}>
            <h3>Add Data Point</h3>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Label"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', flex: '1' }}
                />
                <input
                    type="number"
                    placeholder="$"
                    value={newData}
                    onChange={(e) => setNewData(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', width: '70px' }}
                />
                <button 
                    onClick={addDataPoint} 
                    disabled={newLabel.trim() === "" || !newData || isNaN(Number(newData)) || Number(newData) <= 0}
                    style={{ padding: '5px 10px' }}
                >
                    Add Piece
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>Current Pieces:</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {labels.map((label, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>{label} - ${dataPoints[index]}</span>
                            <button onClick={() => removeDataPoint(index)} style={{ marginLeft: '10px' }}>
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
