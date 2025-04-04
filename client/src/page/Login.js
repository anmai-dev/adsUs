import React, { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { loginCall } from '../redux/apiRequest'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const userLogin = {
            email: email,
            password: password
        }

        try {
            const result = await loginCall(userLogin, dispatch, Navigate);
            if (!result.success && result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred, please try again');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Register now</Link></p>
                </div>
                <div className="benefits">
                    <h3>Member benefits THETHAO24H</h3>
                    <ul>
                        <li>Update sports news fastest</li>
                        <li>Watch top matches live</li>
                        <li>Receive notifications about favorite matches</li>
                        <li>Join the comment and interaction community</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login