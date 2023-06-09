// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import {Link} from "react-router-dom";

function SignUp() {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const permission= useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(firstName.current.value)
        console.log(lastName.current.value)
        console.log(email.current.value)
        console.log(password.current.value)
        console.log(permission.current.checked)
        //todo submit handler
    };

    return (
        <div className='max-w-[600px] mx-auto flex justify-center flex-col font-primary pt-20'>
            <div className='flex items-center flex-col mb-[20px]'>
                <div className='h-14 rounded-full bg-primary w-14 mb-6'></div>
                <div className='text-lg'>Sign up</div>
            </div>
            {/*todo try to remove rows*/}
            <form className='grid grid-cols-2 grid-rows-3 gap-7'>
                <input type='text' ref={firstName} className='border-solid border-2 border-gray rounded p-4' placeholder='First name'/>
                <input type='text' ref={lastName} className='border-solid border-2 border-gray rounded p-4' placeholder='Last name'/>
                <input type='email' ref={email} className='col-span-2 border-solid border-2 border-gray rounded p-4'
                       placeholder='Email'/>
                <input type='password' ref={password} className='col-span-2 border-solid border-2 border-gray rounded p-4'
                       placeholder='Password'/>
            </form>
            <div className='flex justify-between items-center m-[20px]'>
                <input
                    className='checked:bg-accent border-solid border-neutral border-1 rounded mr-4 h-6 w-6 cursor-pointer'
                    type='checkbox' ref={permission} />
                <div className='text-sm'>I want to receive inspiration, marketing promotions and updates via email.
                </div>
            </div>
            <button onClick={submitHandler} className='rounded bg-accent text-neutral uppercase p-3 text-base'>Sign up</button>
            <Link to='/login' className='text-gray no-underline self-end mt-[24px] cursor-pointer'>Already have an
                account? Sign in</Link>
            <div className='text-sm text-gray text-center mt-[34px]'>Copyright SHY {new Date().getFullYear()}</div>
        </div>
    );
}

export default SignUp;
