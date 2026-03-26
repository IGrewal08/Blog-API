import App from "./App";
import Home from "./pages/Home";
/*
    Home page (dashboard)
    Individual post page
    About page
    Contact page
*/

import App from "./App";

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