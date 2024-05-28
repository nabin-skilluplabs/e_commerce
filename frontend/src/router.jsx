import {
    createBrowserRouter
} from "react-router-dom";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="text-center text-8xl m-10">E-commerce</div>,
    },
    {
        path: "/register", 
        element: <Register />
    },
    {
        path: "/login", 
        element: <LogIn />
    },
    {
        path: "/reset-password", 
        element: <ResetPassword />
    },
    {
        path: "/change-password", 
        element: <ChangePassword />
    },
    {
        path: "/dashboard", 
        element: <Dashboard />,
        children: [{
            path: "profile", 
            element: <Profile />
        }]
    },
    {
        path: "/sign-out", 
        element: <SignOut />
    },
]);

export default router;