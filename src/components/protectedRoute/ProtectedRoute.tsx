import Wrapper from "../wrapper/Wrapper";
import { Navigate, Outlet } from "react-router-dom";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";

const ProtectedRoute = () => {
  const { getToken } = tokenInstance;
  return getToken() ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={"/signin"} replace />
  );
};

export default ProtectedRoute;
