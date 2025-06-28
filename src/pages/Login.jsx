import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent from refreshing
        console.log('Email: ', email, 'Password: ', password);

        //implement Api call
        try {
            const response = await axios.post(
                'https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/auth/login',
                {
                    email: email,
                    password: password
                }
            );

            localStorage.setItem('token', response.data.token);

            navigate('/tasks')
        } catch (error) {
            console.error('Login failed', error);
            alert('Invalid email or password');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>New user?</p>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );

}

export default Login;