import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from './../../context/firebase';
import "./style.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from './../../constants/routes';

const Login = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const isInvalid = password === '' || email === '';

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate(HOME);

        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    }


    useEffect(() => {
        document.title = "Login - Instagram";
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
              Log In To Make Friends.
              </p>
             
              <div className="flex items-center my-3 w-full">
                <div className="border-b-[1px] border-black h-0 w-full"></div>
              </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                        <span>Email ccount</span>
                            <input
                                type="text"
                                aria-label="Your email address"
                                placeholder="Your email account"
                                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                        <span>Password</span>
                            <input
                                type="password"
                                aria-label="Your password"
                                placeholder="Password"
                                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-500  mt-3 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Log In
                            </button>
                        </div>
                        <div className='text-center mt-3 '>
                            <Link to={FORGOTPASSWORD} className="text-blue-500 text-center w-full text-x font-thin my-3">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="flex justify-center items-center flex-col w-full bg-white p-4">
                    <p className="text-sm">{` `}
                        <Link to={SIGN_UP} className="font-bold text-xl text-blue-500">Sign up</Link>
                    </p>
                </div>
                    </form>
                </div>
              
            </div>
        </div>
    );
};

export default Login;
