import { NavLink, Link } from "react-router-dom";

export default function Header() {
     function userCheck() { return localStorage.getItem('token'); }
    return (
        <>
            <Link>
                Home
            </Link>
            <div>
                {(userCheck) ? 
                (<></>) 
                : (<NavLink to="/login">Login</NavLink>)}
            </div>
            <NavLink to="/new">
                New
            </NavLink>
        </>
    );
}