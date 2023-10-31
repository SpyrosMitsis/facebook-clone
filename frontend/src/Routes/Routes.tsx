import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Pages";
import App from "../App";
import Home from "../Pages/Home/Home";
import Post from "../components/Feed";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Login />,
            },
            {
                path: '/Home',
                element: <Home/>,
            },
            {
                path: '/post',
                element: <Post/>,
            },
        ],
    },
]);