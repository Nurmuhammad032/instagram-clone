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
        console.log("Password reset email sent!");
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
    <div
      className="h-screen w-screen flex flex-wrap items-center justify-center p-3"
      style={{
        background: "linear-gradient(120deg, blue, #ba2c95, orange)",
      }}
    >
      <div className="flex flex-col">
        <div
          className="border-[1px] rounded-2xl shadow-lg p-8 w-[30rem] p-3 border-gray-400"
          style={{
            backdropFilter: "blur(10rem)",
          }}
        >
          <div className="w-full">
            <img
              src="/images/instalogo2.png"
              className="mt-2 max-w-[12rem] mx-auto my-2"
              alt="instagram"
            />
          </div>
          <p className="text-center text-white my-4 tracking-wide">
            Reset password
          </p>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <input
                type="text"
                aria-label="Enter your email address"
                placeholder="Enter Your Email"
                className="text-sm p-3 mb-3 outline-none border-none rounded-full bg-white w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-10 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                Reset Password
              </button>
            </div>
          </form>
          <div className="flex mt-5 justify-center items-center">
            <p className="text-sm text-white tracking-wide">
              <Link to={LOGIN} className="font-semibold">
                Return to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
