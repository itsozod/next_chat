import { jwtDecode, JwtPayload } from "jwt-decode";
import { useToken } from "../../pages/login/store";
interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

export const tokenParser = () => {
  const token = useToken?.getState()?.token;

  if (!token) {
    return { id: null, username: null };
  }

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return {
      id: decoded?.id || null,
      username: decoded?.username || null,
    };
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return { id: null, username: null };
  }
};
