import Contacts from "@/pages/contacts/Contacts";
import Home from "@/pages/home/Home";
import Login from "@/pages/signIn/SignIn";
import Profile from "@/pages/profile/Profile";
import Register from "@/pages/signUp/SignUp";
import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "@/app/providers/routes/protectedLayout/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    index: true,
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);

export default router;
