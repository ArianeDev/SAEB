import { createBrowserRouter } from "react-router-dom";
import { DataProduct } from "./Page/DataProducts";
import { DataStock } from "./Page/DataStock";
import { HomeUser } from "./Page/HomeUser";
import { Login } from "./Page/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <HomeUser />
    },
    {
        path: '/products',
        element: <DataProduct />
    },
    {
        path: '/stock',
        element: <DataStock />
    },
])

export default router;