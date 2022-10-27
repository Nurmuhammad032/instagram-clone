import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import Login from './Login';
import { LOGIN } from '../../constants/routes';

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            setError(`${error.code} ${error.message}`)
        });
    }

    const isInvalid = email.trim() === '';

    useEffect(() => {
        document.title = "Forgot Password - Instagram";
    }, [])

    return (
        <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
        <div className="flex flex-col">
            <div className="border-[1px] bg-white p-4 mb-5 w-80 rounded-xl shadow-2xl">
            <div className="w-full">
                <img
                  src="/images/download.jpeg"
                  className="h-20 mt-2 mx-auto my-2"
                  alt="instagram"
                />
              </div>
              <p className="text-center font-bold  text-lg text-slate-800">
              Update password
              </p>
              <div className="flex items-center my-3 w-full">
                <div className="border-b-[1px] border-black h-0 w-full"></div>
              </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <span>Email</span>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder="Enter Your Email"
                                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Reset Password
                            </button>
                        </div>
                        <div className="flex justify-center items-center flex-col w-full bg-white p-4">
                    <p className="text-sm">
                        <Link to={LOGIN} className="font-bold text-xl text-blue-500">Log in</Link>
                    </p>
                </div>
                    </form>
                </div>
               
            </div>
        </div>
    );
};

export default ForgotPassword;
