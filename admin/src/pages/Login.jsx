import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();
        e.target.reset();
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/');
        }
    };

    return (
        <>
            <div>Log-In</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}