import { Navigate, Outlet } from "react-router-dom";
import Wrapper from "../wrapper/Wrapper";
import { useToken } from "../../pages/login/store";

const ProtectedRoute = ({ onlyFor }: { onlyFor: boolean }) => {
  const { token } = useToken();

  if (!token) return <Navigate to={"/signin"} replace={true} />;

  return token && onlyFor ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <div>Unable to access</div>
  );
};

export default ProtectedRoute;
