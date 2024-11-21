import React, { useEffect, useContext, useState } from "react";
import './preview.css';
import { UsernameContext } from "../contexts/UsernameContext";
import axios from "axios";

function Preview() {

    const [income, setIncome] = useState(0);
    const [payment, setPayment] = useState(0);
    const [balance, setBalance] = useState(0);
    const { variable } = useContext(UsernameContext);

    const getData = () => {
        axios.post('http://localhost:8081/preview/getData', {username: variable})
        .then(res => {
            console.log(res);
            const data = res.data;

            const firstObject = data[0];
            setIncome(firstObject.income);
            setPayment(firstObject.payment);
            setBalance(Number(firstObject.income) - Number(firstObject.payment));
        });
    }

    //Hardcoded for now but must use the db to get info 
    const percent1 = 20
    const percent2 = 30.54
    const percent3 = 100

    useEffect(() => {
        getData();
      }, []);
  
    return (
        <div className="page-container">
            <div className="income-container">
                <h1>Account Overview</h1>
                <h3>Total Income: ${income}</h3>
                <h3>Total Payment: ${payment}</h3>
                <h3>Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>

            </div>
            <div className="payment-container">
                <h1>Savings Overview</h1>
                <h3>Goal 1: {percent1}% Complete</h3>
                <h3>Goal 2: {percent2}% Complete</h3>
                <h3>Goal 3: {percent3}% Complete</h3>
            </div>
        </div>
    );
}

export default Preview;
