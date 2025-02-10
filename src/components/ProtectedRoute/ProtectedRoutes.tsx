import Wrapper from "../Wrapper/Wrapper";
import { Navigate, Outlet } from "react-router-dom";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";

const ProtectedRoutes = () => {
  const { getToken } = tokenInstance;
  return getToken() ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={"/signin"} replace />
  );
};

export default ProtectedRoutes;
