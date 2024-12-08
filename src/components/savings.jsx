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
    const [noGoals, setNoGoals] = useState('');
    const [noCompletedGoals, setNoCompletedGoals] = useState('');

    const { variable } = useContext(UsernameContext);

    // current balance
    const [balance, setBalance] = useState(0);

    const handleDeleteGoal = (targetIndex) => {
        const newGoals = goals.filter(goal => goal.id !== targetIndex);
        setGoals(newGoals);
        deleteGoal(targetIndex);
        getBalance();
    }

    const handleCompleted = (targetIndex) => {
        const newCompleted = goals.filter(goal => goal.id === targetIndex);
        const notCompleted = goals.filter(goal => goal.id !== targetIndex);
        setGoals(notCompleted);
        setCompletedGoals(prevCompletedGoals => [...prevCompletedGoals, ...newCompleted]);
        markCompleted(targetIndex);
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
            progress: 0,
            deleteGoal: {handleDeleteGoal},
            moveToComplete: {handleCompleted},
            getBalance: {getBalance}
        }

        setGoals([...goals, newGoal]);
        addGoal(dateID);
        setGoalTitle('');
        setGoalAmount('');
    }

    const getBalance = () => {
        axios.post('http://localhost:8081/savings/getBalance', {username: variable})
        .then(res => {
            const data = res.data;
            const object = data[0];
            if (isNaN(object.income) === false && isNaN(object.payment) === false) {
                setBalance(Number(object.income) - Number(object.payment));
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const addGoal = (dateID) => {
        axios.post('http://localhost:8081/savings/addGoal', {username: variable, dateID: dateID, title: goalTitle, amount: goalAmount, progress: 0, percentage: 0})
        .then(res => {
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const getGoals = () => {
        axios.post('http://localhost:8081/savings/getGoals', {username: variable})
        .then(res => {
            const data = res.data;

            if (data.length === 0) {
                setNoGoals('You currently have no savings goals.');
            }
            else {
                setNoGoals('');
            }

            const newGoals = data.map(goal => ({
                id: goal.dateID,
                title: goal.title,
                amount: parseFloat(goal.amount),
                progress: parseFloat(goal.progress),
                deleteGoal: {handleDeleteGoal},
                moveToComplete: {handleCompleted},
                getBalance: {getBalance}
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
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const getCompleted = () => {
        axios.post('http://localhost:8081/savings/getCompleted', {username: variable})
        .then(res => {
            const data = res.data;

            if (data.length === 0) {
                setNoCompletedGoals('You currently have no completed goals.');
            }
            else {
                setNoCompletedGoals('');
            }

            const newGoals = data.map(goal => ({
                id: goal.dateID,
                title: goal.title,
                amount: parseFloat(goal.amount),
                deleteGoal: {handleDeleteGoal},
                moveToComplete: {handleCompleted},
                getBalance: {getBalance}
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
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const markCompleted = (targetIndex) => {
        axios.post('http://localhost:8081/savings/markCompleted', {username: variable, dateID: targetIndex})
        .then(res => {
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const deleteGoal = (targetIndex) => {
        axios.post('http://localhost:8081/savings/deleteGoal', {username: variable, dateID: targetIndex})
        .then(res => {
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getGoals();
        getCompleted();
        getBalance();
      }, []);

    return (
        <div className='savings-container'>
            <h3 className='current-balance'  style={{background: balance < 0 ? "#db3737" : "#448633"}}>Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>
            <div className='savings-new-goal'>
                <input className='savings-title-input' type="text" value={goalTitle} placeholder='Title' onChange={e => setGoalTitle(e.target.value)}/>
                <input className='savings-amount-input' type='float' value={goalAmount} placeholder='$' onChange={e => setGoalAmount(e.target.value)}/>
                <button className='savings-create-goal' onClick={handleCreateGoal}>Create New Goal</button>
            </div>
            <div className="savings-inProgress-container">
                <h1 className="savings-inProgress-label">In Progress</h1>
                <div>{noGoals}</div>
                {goals.map(goal => (
                    <ProgressBar
                        key={goal.id}
                        id={goal.id}
                        text={goal.title}
                        amount={goal.amount}
                        progress={goal.progress}
                        deleteGoal={handleDeleteGoal}
                        moveToComplete={handleCompleted}
                        getBalance={getBalance}
                    />
                ))}
            </div>
            <div className="savings-completed-container">
                <h1 className="savings-completed-label">Completed</h1>
                <div>{noCompletedGoals}</div>
                {completedGoals.map(goal => (
                    <div key={goal.id}>
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