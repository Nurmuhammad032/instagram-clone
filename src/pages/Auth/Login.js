import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "./../../constants/routes";
import Sidebar from "./Sidebar";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2 h-full">
        <Sidebar />
      </div>
      <div className="w-1/2 h-full bg-[#f7f7f7]">
        <div className="flex flex-col h-full items-center justify-center">
          <h1 className="text-4xl font-semibold text-[#666666] mb-5 text-center">
            Sign in to see photos <br /> and videos from your friends.
          </h1>
          <div className="mb-5 w-80">
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-3" method="post">
              <div>
                <input
                  type="text"
                  aria-label="Your email address"
                  placeholder="Your email account"
                  className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0] bg-[#dddddd] w-full border-black outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  aria-label="Your password"
                  placeholder="Password"
                  className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0] bg-[#dddddd] w-full border-black outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={isInvalid}
                  type="submit"
                  className="cursor-pointer text-white rounded-full w-full h-10 register-btn"
                >
                  Log In
                </button>
              </div>
              <div className="text-center mt-3 ">
                <Link
                  to={FORGOTPASSWORD}
                  className="text-blue-500 text-center w-full my-3"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full">
            <p className="text-sm text-[#8f8f8f]">
              Don't have an account?
              <Link to={SIGN_UP} className="ml-2 text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
