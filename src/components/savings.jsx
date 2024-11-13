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
        const notCompleted = goals.filter(goal => goal.id !== targetIndex);
        setGoals(notCompleted);
        setCompletedGoals(prevCompletedGoals => [...prevCompletedGoals, ...newCompleted]);
    }

    const handleCreateGoal = () => {
        if (!goalTitle || !goalAmount || isNaN(goalAmount)) {
            alert('Please enter a valid goal title and amount');
            return;
        }

        let dateID = Date.now();

        const newGoal = {
            id: dateID,
            title: goalTitle,
            amount: parseFloat(goalAmount),
            deleteGoal: {handleDeleteGoal},
            moveToComplete: {handleCompleted},
        }

        setGoals([...goals, newGoal]);
        addGoal(dateID);
        setGoalTitle('');
        setGoalAmount('');
    }

    const addGoal = (dateID) => {
        axios.post('http://localhost:8081/savings/addGoal', {username: 'testUsername', dateID: dateID, title: goalTitle, amount: goalAmount, remaining: goalAmount, percentage: 0})
        .then(res => {
          console.log(res);
        });
    }

    const getGoals = () => {
        axios.post('http://localhost:8081/savings/getGoals', {username: 'testUsername'})
        .then(res => {
            console.log(res)
            const data = res.data;

            const newGoals = data.map(goal => ({
                id: goal.dateID,
                title: goal.title,
                amount: parseFloat(goal.amount),
                deleteGoal: {handleDeleteGoal},
                moveToComplete: {handleCompleted},
            }));

            setGoals(prevGoals => {
                const updatedGoals = [...prevGoals];
                newGoals.forEach(newGoal => {
                    if (!updatedGoals.some(goal => goal.id === newGoal.id)) {
                        updatedGoals.push(newGoal);
                    }
                });
                return updatedGoals;
            });
        });
    }

    const getCompleted = () => {
        axios.post('http://localhost:8081/savings/getCompleted', {username: 'testUsername'})
        .then(res => {
            console.log(res)
            const data = res.data;

            const newGoals = data.map(goal => ({
                id: goal.dateID,
                title: goal.title,
                amount: parseFloat(goal.amount),
                deleteGoal: {handleDeleteGoal},
                moveToComplete: {handleCompleted},
            }));

            setCompletedGoals(prevGoals => {
                const updatedGoals = [...prevGoals];
                newGoals.forEach(newGoal => {
                    if (!updatedGoals.some(goal => goal.id === newGoal.id)) {
                        updatedGoals.push(newGoal);
                    }
                });
                return updatedGoals;
            });
        });
    }

    useEffect(() => {
        getGoals();
        getCompleted();
      }, []);

    return (
        <div className='savings-container'>
            <div className='savings-new-goal'>
                <input className='savings-title-input' type="text" value={goalTitle} placeholder='Title' onChange={e => setGoalTitle(e.target.value)}/>
                <input className='savings-amount-input' type='float' value={goalAmount} placeholder='$' onChange={e => setGoalAmount(e.target.value)}/>
                <button className='savings-create-goal' onClick={handleCreateGoal}>Create New Goal</button>
            </div>
            <div className="savings-inProgress-container">
                <h2 className="savings-inProgress-label">In Progress</h2>
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
                <h2 className="savings-completed-label">Completed</h2>
                {completedGoals.map(goal => (
                    <div>
                        <div className='savings-completed-item'>
                            <div className='savings-completed-item-label'>
                                <div className='savings-completed-title'>{goal.title}</div>
                                <div className='savings-completed-amount'>Goal: {goal.amount}</div>
                            </div>
                            <div className='savings-progress-item'>
                                <div className="savings-progress-bar"></div>
                                <div className="savings-ratio-label">
                                    <div>{goal.amount}</div>
                                    <div>/</div>
                                    <div>{goal.amount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Savings;