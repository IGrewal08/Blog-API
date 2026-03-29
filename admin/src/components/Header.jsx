import { NavLink, Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Link>
                Home
            </Link>
            <NavLink to="/login">
                Login
            </NavLink>
            <NavLink to="/new">
                New
            </NavLink>
        </>
    );
}