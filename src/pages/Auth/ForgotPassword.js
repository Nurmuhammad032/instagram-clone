import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import Login from "./Login";
import { LOGIN } from "../../constants/routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = email.trim() === "";

  useEffect(() => {
    document.title = "Forgot Password - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex flex-col">
        <div className="border-[1px] bg-white p-4 w-80 p-3 border-gray-400">
          <div className="w-full">
            <img
              src="/images/instatext.png"
              className="mt-2 max-w-[8rem] mx-auto my-2"
              alt="instagram"
            />
          </div>
          <p className="text-center font-bold  text-lg text-slate-800">
            Update password
          </p>
          <div className="flex items-center my-3 w-full">
            <div className="border-b-[1px] border-black h-0 w-full"></div>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <span className="mb-2 block">Email</span>
              <input
                type="text"
                aria-label="Enter your email address"
                placeholder="Enter Your Email"
                className="text-xs p-3 mb-3 outline-none border-[1px] rounded bg-white w-full border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="flex bg-[#FAFAFA] justify-center items-center flex-col border-t-0 w-full bg-white p-4 border-[1px] border-gray-400">
          <p className="text-sm">
            <Link to={LOGIN} className="font-semibold text-black">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
