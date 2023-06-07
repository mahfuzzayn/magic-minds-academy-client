import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            404
            <Link to="/">GO HOME</Link>
        </div>
    );
};

export default ErrorPage;