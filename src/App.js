import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import useAuthListener from "./hooks/useAuthListener";
import * as ROUTE from "./constants/routes";
import Layout from "./Positons/Layout.js";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/ProtectedRoute";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";
import EditUserPage from "./pages/UserPage/EditUserPage";
import Lottie from "react-lottie-player";
import animate from "./assets/reactload.json";

const Login = React.lazy(() => import("./pages/Auth/Login.js"));
const SignUp = React.lazy(() => import("./pages/Auth/SignUp.js"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const UserPage = React.lazy(() => import("./pages/UserPage/UserPage"));
const ForgotPassword = React.lazy(() => import("./pages/Auth/ForgotPassword"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Lottie animationData={animate} loop play />
            </div>
          }
        >
          <Routes>
            <Route
              path={ROUTE.HOME}
              element={
                <ProtectedRoute user={user}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path={ROUTE.PROFILE} element={<UserPage />} />
              <Route path={ROUTE.EDIT_PROFILE} element={<EditUserPage />} />
            </Route>
            <Route
              path={ROUTE.LOGIN}
              element={
                <IsUserLoggedIn user={user}>
                  <Login />
                </IsUserLoggedIn>
              }
            />
            <Route
              path={ROUTE.FORGOTPASSWORD}
              element={
                <IsUserLoggedIn user={user}>
                  <ForgotPassword />
                </IsUserLoggedIn>
              }
            />
            <Route
              path={ROUTE.SIGN_UP}
              element={
                <IsUserLoggedIn>
                  <SignUp />
                </IsUserLoggedIn>
              }
            />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
