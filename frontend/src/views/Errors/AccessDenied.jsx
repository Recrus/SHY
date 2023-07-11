import React from 'react';
import {Link} from "react-router-dom";

function NoContent() {
    return (
        <div className='bg-gradient-to-r from-purple from-10% via-primary via-30% to-pink to-90% h-screen flex justify-center items-center flex-col'>
            <div className='mb-4 text-[54px] text-neutral'>403</div>
            <div className='mb-4 text-sm text-neutral'>Hmm, seems like you don't have permission to visit this page</div>
            <div className='flex'>
                <div className='drop-shadow-lg p-4 mr-4 bg-neutral rounded transition ease-in-out delay-150 hover:bg-accent hover:text-neutral'>
                    <Link to='/login'>I have!</Link>
                </div>
                <div className='drop-shadow-lg p-4 bg-neutral rounded transition ease-in-out delay-150 hover:bg-accent hover:text-neutral'>
                    <Link to='/landing'>Go home</Link>
                </div>
            </div>
        </div>
    );
}

export default NoContent;
