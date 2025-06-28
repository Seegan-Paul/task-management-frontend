import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email:', email, 'Password:', password);

    try {
      const response = await axios.post(
        'https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/auth/signup',
        {
          email: email,
          password: password
        }
      );

      console.log('Sign up successful', response.data);
      alert('Sign up successful! Please login.');

      navigate('/login'); // navigate to login page after signup
    } catch (error) {
      console.error('Sign up failed', error);
      alert('Sign up failed: ' + (error.response?.data || error.message));
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
