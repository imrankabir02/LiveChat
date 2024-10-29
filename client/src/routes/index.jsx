import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register"
import Home from "../pages/Home";
import Message from "../components/Message";
import CheckEmail from "../pages/CheckEmail";
import AuthLayouts from "../layout";
import CheckPassword from "../pages/CheckPassword";
import ForgotPassword from "../pages/ForgotPassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <AuthLayouts> <Register /> </AuthLayouts>
            },
            {
                path: "email",
                element: <AuthLayouts><CheckEmail /></AuthLayouts>
            },
            // {
            //     path: "login",
            //     element: <AuthLayouts><Login /></AuthLayouts>
            // },
            {
                path: "password",
                element: <AuthLayouts><CheckPassword/></AuthLayouts>
            },
            {
                path: "forget-password",
                element: <AuthLayouts><ForgotPassword/></AuthLayouts>
            },
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: ":userId",
                        element: <Message />
                    }
                ]
            }
        ]
    }
])

export default router