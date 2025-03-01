import { Navigate } from "react-router-dom";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import Layout from "@/components/layout/Layout";

const ProtectedLayout = () => {
  const { getToken } = tokenInstance;
  return getToken() ? <Layout /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedLayout;
