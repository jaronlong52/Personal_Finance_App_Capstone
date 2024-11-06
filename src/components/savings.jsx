import React, { useContext, useEffect, useState } from 'react';
import './savings.css';
import ProgressBar from './progressBar';
import { UsernameContext } from '../contexts/UsernameContext';
import axios from 'axios';

const Savings = () => {

    return (
        <div>
            <ProgressBar/>
            <ProgressBar/>
            <ProgressBar/>
        </div>
    )
}

export default Savings;