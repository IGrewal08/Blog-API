import { NavLink, Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Link>
                Home
            </Link>
            <NavLink to="about">
                About
            </NavLink>
            <NavLink to="contact">
                Contact
            </NavLink>
        </>
    );
}