import React, { useContext, useEffect, useState } from 'react';
import './savings.css';
import ProgressBar from './progressBar';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Savings = (props) => {

    const [goals, setGoals] = useState([]);
    const [goalTitle, setGoalTitle] = useState('');
    const [goalAmount, setGoalAmount] = useState('');

    const handleDeleteGoal = (targetIndex) => {
        const newGoals = goals.filter(goal => goal.index !== targetIndex);
        setGoals(newGoals);
    }

    const handleCreateGoal = () => {
        if (!goalTitle || !goalAmount || isNaN(goalAmount)) {
            alert('Please enter a valid goal title and amount');
            return;
        }

        setGoals([...goals, <ProgressBar key={Date.now()}
                                         index={goals.length} 
                                         text={goalTitle} 
                                         amount={parseFloat(goalAmount)} 
                                         deleteGoal={handleDeleteGoal}/>]);
        setGoalTitle('');
        setGoalAmount('');
    }

    return (
        <div className='savings-container'>
            <div className='savings-new-goal'>
                <input className='savings-title-input' type="text" value={goalTitle} placeholder='Title' onChange={e => setGoalTitle(e.target.value)}/>
                <input className='savings-amount-input' type='float' value={goalAmount} placeholder='$' onChange={e => setGoalAmount(e.target.value)}/>
                <button className='savings-create-goal' onClick={handleCreateGoal}>Create New Goal</button>
            </div>
            {goals}
        </div>
    )
}

export default Savings;