import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, LOGIN, FORGOTPASSWORD } from "./../../constants/routes";
import { doesUsernameExist } from "./../../services/firebase";
import Sidebar from "./Sidebar";

const SignUp = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });

          navigate(HOME);
        } catch (error) {
          setFullName("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center">
      <div className="w-1/2 h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col items-center w-1/2 h-full justify-center bg-[#f7f7f7]">
        <h1 className="text-4xl font-semibold text-[#666666] mb-5 text-center">
          Sign up to see photos <br /> and videos from your friends.
        </h1>
        <div className="p-4 mb-5 w-[25rem] border-gray-300">
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} method="post">
            <div>
              <input
                type="text"
                placeholder=" Your Username"
                className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0] bg-[#dddddd] w-full border-black outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Full Name"
                className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0]  bg-[#dddddd] w-full border-black outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder=" Your Email"
                className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0]  bg-[#dddddd] w-full border-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password(12345678)"
                className="text-sm p-3 mb-3 border-none rounded-full placeholder:text-[#a0a0a0]  bg-[#dddddd] w-full border-black outline-none"
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
                Sign up
              </button>
            </div>
            <div className="text-center mt-3">
              <Link
                to={FORGOTPASSWORD}
                className="text-blue-400 text-center w-full text-x"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <p className="text-sm text-[#8f8f8f]">
          Have an account?
          <Link to={LOGIN} className="ml-1 text-blue-400">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
