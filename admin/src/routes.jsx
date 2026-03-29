import App from "./App";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import New from "./pages/New";
import ErrorPage from "./pages/ErrorPage";

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/post/:id", element: <Post /> },
            { path: "/new", element: <New /> },
            { path: "/edit", element: <Edit /> },
        ],
        errorElement: <ErrorPage />,
    },
];