import App from "./App";
import Home from "./pages/Home";
import Post from "./pages/Post";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "/post/:id", element: <Post /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
        ],
        errorElement: <ErrorPage />,
    },
];