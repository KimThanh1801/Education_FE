import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../../services/providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginImage } from '../../../assets';
import { login } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';
function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({email, password});
      const data = response.data;
      console.log("Data: ", data);
      if(data) {
        setUser({
          username: data.username,
          role: data.role,
          token: data.access_token,
          user_id: data.user_id
        });

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        navigate('/');
      }
    } catch (error) {
      console.error("Login Error: ", error);
      toast.error("Invalid credentials.", {
        position: "top-right",
        autoClose: 2000
      })
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login illustration" />
      </div>
    </div>
  );
}

export default Login;