import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate, useLocation } from "react-router";
import UsePrimaryBtn from "../CustomHooks/UsePrimaryBtn";
import { Link } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // states
  const location = useLocation();

  // context api
  const { user, loading } = useContext(AuthContext);

  // checking, if the user is logged in or not
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center flex-col gap-3">
        <p className="text-white w-80 h-80 loading loading-infinity loading-xl"></p>
        <h1 className="text-2xl text-white">Loading Data...</h1>
        <Link to="/">
          <UsePrimaryBtn isCancel={true}>Back to Home Page</UsePrimaryBtn>
        </Link>
      </div>
    );
  }

  // If the user is here
  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    ></Navigate>
  );
};

export default PrivateRoute;
