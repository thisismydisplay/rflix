import './Error404Page.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Error404Page() {
    return (
        <div className='resource-not-found-div'>
            <h1>Error 404 - Resource not found.</h1>
            <Link to='/' exact>
                <button className='sign-in-btn'>Go home</button>
            </Link>
        </div>
    );
}

export default Error404Page;
