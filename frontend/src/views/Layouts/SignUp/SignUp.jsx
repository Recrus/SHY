import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import logo from "../../../media/logo-nobg.svg";
import DarkModeSwitcher from "../../../components/UI/DarkModeSwitcher/DarkModeSwitcher.jsx";

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
        <div className='h-screen w-screen dark:bg-dark-blue ease-in-out duration-300'>
            <div className='max-w-[370px] mx-auto flex justify-center flex-col font-primary pt-20 md:max-w-[680px] 2xl:max-w-[800px]'>
                <div className='flex items-center flex-col mb-[20px]'>
                    <img src={logo} alt="#" className='h-[125px] w-[125px] mr-5 2xl:h-[150px] 2xl:w-[150px]'/>
                    <div className='text-lg dark:text-gray'>Sign up</div>
                </div>
                {/*todo try to remove rows*/}
                <form className='grid grid-cols-2 grid-rows-3 gap-7'>
                    <input type='text' ref={firstName} className='bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg ' placeholder='First name'/>
                    <input type='text' ref={lastName} className='bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg' placeholder='Last name'/>
                    <input type='email' ref={email} className='bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg'
                           placeholder='Email'/>
                    <input type='password' ref={password} className='bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg'
                           placeholder='Password'/>
                </form>
                <div className='flex justify-around items-center mt-[20px]'>
                    <input
                        className='bg-neutral border-solid border-neutral border-1 rounded mr-4 h-8 w-8 cursor-pointer 2xl:h-10 2xl:w-10'
                        type='checkbox' ref={permission} />
                    <div className='text-[12px] md:text-sm 2xl:text-base dark:text-gray'>I want to receive inspiration, marketing promotions and updates via email.
                    </div>
                </div>
                <button onClick={submitHandler} className='rounded bg-accent text-neutral uppercase p-3 text-base mt-[20px] drop-shadow-md 2xl:text-lg dark:bg-dark-purple'>Sign up</button>
                <Link to='/login' className='text-gray no-underline self-end mt-[20px] text-[12px] cursor-pointer md:text-sm 2xl:text-base'>Already have an
                    account? Sign in</Link>
                <div className='text-[10px] text-gray text-center mt-[34px] md:text-[12px]'>Copyright © SHY {new Date().getFullYear()}</div>
                <div className='absolute top-10 right-10'>
                    <DarkModeSwitcher/>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
