import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Shared/Secret";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../Pages/Dashboard/Cart";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AddItems from "../Pages/Dashboard/Admin/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems";
import UpdateItem from "../Pages/Dashboard/Admin/UpdateItem";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <p>There was an error in main</p>,
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
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
            {
                path: "/secret",
                element: <PrivateRoute>
                    <Secret></Secret>
                </PrivateRoute>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        errorElement: <p>There was an error in dashboard</p>,
        children: [
            // normal user routes
            {
                path: "cart",
                element: <Cart></Cart>,
            },
            // admin routes
            {
                path: "addItems",
                // element: <AddItems></AddItems>,
                element: <AdminRoute><AddItems></AddItems></AdminRoute>,
            },
            {
                path: "allUsers",
                // element: <AllUsers></AllUsers>,
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: "manageItems",    // 57 ta data show krbe
                element: <ManageItems></ManageItems>,
            },
            {
                path: "updateItem/:id",
                element: <UpdateItem></UpdateItem>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
        ],
    },
]);