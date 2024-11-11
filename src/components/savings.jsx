import React, { useContext, useEffect, useState } from 'react';
import './savings.css';
import ProgressBar from './progressBar';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Savings = (props) => {

    const [goals, setGoals] = useState([]);
    const [goalTitle, setGoalTitle] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [completedGoals, setCompletedGoals] = useState([]);

    const handleDeleteGoal = (targetIndex) => {
        const newGoals = goals.filter(goal => goal.id !== targetIndex);
        setGoals(newGoals);
    }

    const handleCompleted = (targetIndex) => {
        const newCompleted = goals.filter(goal => goal.id === targetIndex);
        setCompletedGoals(...completedGoals, newCompleted);
    }

    const handleCreateGoal = () => {
        if (!goalTitle || !goalAmount || isNaN(goalAmount)) {
            alert('Please enter a valid goal title and amount');
            return;
        }

        const newGoal = {
            id: Date.now(),
            title: goalTitle,
            amount: parseFloat(goalAmount),
            deleteGoal: {handleDeleteGoal},
            moveToComplete: {handleCompleted},
        }

        setGoals([...goals, newGoal]);
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
            <div className="savings-inProgress-container">
                <div className="savings-inProgress-label">In Progress</div>
                {goals.map(goal => (
                    <ProgressBar
                        key={goal.id} // Use unique id as the key
                        id={goal.id} // Pass the unique id to ProgressBar
                        text={goal.title}
                        amount={goal.amount}
                        deleteGoal={handleDeleteGoal} // Pass delete handler
                        moveToComplete={handleCompleted}
                    />
                ))}
            </div>
            <div className="savings-completed-container">
                <div className="savings-completed-label">Completed</div>
                {completedGoals.map(goal => (
                    <ProgressBar
                        key={goal.id} // Use unique id as the key
                        id={goal.id} // Pass the unique id to ProgressBar
                        text={goal.title}
                        amount={goal.amount}
                        deleteGoal={handleDeleteGoal} // Pass delete handler
                        moveToComplete={handleCompleted}
                    />
                ))}
            </div>
        </div>
    )
}

export default Savings;