import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const [user] = useAuth();
  return user ? <Outlet/> : <Navigate to="/about" />;
};

export default PrivateRoute;
