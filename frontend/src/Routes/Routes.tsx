import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Pages";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Login />
            },
        ],
    },
]);