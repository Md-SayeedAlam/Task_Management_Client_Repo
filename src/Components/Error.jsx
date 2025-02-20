import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center gap-5' >
        <h1 className='font-bold text-5xl text-black-600'>404</h1>
        <h2 className="text-5xl text-red-600">Page Not Found</h2>
        <Link to='/'><button className='btn px-4  btn-neutral'>Go Home</button></Link>
        
        </div>
    );
};

export default Error;