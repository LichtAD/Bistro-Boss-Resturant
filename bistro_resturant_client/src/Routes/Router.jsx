import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";

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
        ],
    },
]);