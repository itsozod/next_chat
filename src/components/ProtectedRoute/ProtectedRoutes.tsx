import { Navigate } from "react-router-dom";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import Layout from "@/components/layout/Layout";


const ProtectedRoutes = () => {
  const { getToken } = tokenInstance;
  return getToken() ? <Layout /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedRoutes;
