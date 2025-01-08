import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <p>There was an error</p>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/menu",
                element: <Menu></Menu>,
            },
            {
                path: "/order/:category",
                element: <Order></Order>,
            },
        ],
    },
]);