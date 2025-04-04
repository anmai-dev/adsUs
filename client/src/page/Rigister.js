import React, { useState } from 'react'
import "./Rigister.scss"
import { Link } from 'react-router-dom'
import { registerCall } from '../redux/apiRequest'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        registerCall(newUser, dispatch, Navigate)
    }

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Register Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
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
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Register Now</button>
                    </div>
                </form>
                <div className="login-link">
                    <p>Have an account? <Link to="/login">Login</Link></p>
                </div>
                <div className="benefits">
                                    <h3>Special benefits when registering</h3>
                    <ul>
                        <li><strong>VIP 1 month</strong> - Watch unlimited matches</li>
                        <li><strong>Priority</strong> - Early notification of special events</li>
                        <li><strong>Exclusive</strong> - Deep content from experts</li>
                        <li><strong>Community</strong> - Join the special fan group</li>
                        <li><strong>20% off</strong> - For live sports events</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Register