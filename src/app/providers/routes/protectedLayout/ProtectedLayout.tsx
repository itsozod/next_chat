import { Navigate } from "react-router-dom";
import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import Layout from "@/widgets/layout/Layout";

const ProtectedLayout = () => {
  const { getToken } = tokenInstance;
  return getToken() ? <Layout /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedLayout;
