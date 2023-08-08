import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { resetPassword } from '../../../backend/controllers/user.controller';

const LoginForm = () => {
    document.title = 'Login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState('');

    const handleLogin = async () => {
        // Validate input fields
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            // Send a POST request to login endpoint with email and password
            const response = await fetch('https://weary-bee-gaiters.cyclic.app/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Save the JWT token to local storage for authentication
                localStorage.setItem('jwt_token', data.token);
                // Redirect to the home page or any other page after successful login
                // For example, you can use the useHistory hook from react-router-dom
                // history.push('/home');
                toast.success('Login successful!');
                window.location.href = '/';
            } else {
                toast.error('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Failed to log in. Please try again later.');
        }
    };

    const handleResetPassword = async () => {
        // Validate the reset email field
        if (!resetPassword.trim()) {
            toast.error('Please enter your email to reset the password.');
            return;
        }

        try {
            // Send a POST request to the reset-password endpoint with the reset email
            const response = await fetch('https://weary-bee-gaiters.cyclic.app/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: resetPassword }),
            });

            if (response.ok) {
                toast.success('Password reset email sent! Please check your email to proceed.');
                setShowResetPassword(false);
                setResetPassword('');
            } else {
                toast.error('Failed to initiate password reset. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Failed to reset password. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {showResetPassword ? (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resetEmail">
                            Reset Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="resetPassword"
                            type="password"
                            placeholder="Reset Password"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                        />
                    </div>
                ) : null}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={showResetPassword ? handleResetPassword : handleLogin}
                    >
                        {showResetPassword ? 'Reset Password' : 'Log In'}
                    </button>
                    <button
                        className="ml-4 text-gray-500 underline focus:outline-none"
                        type="button"
                        onClick={() => setShowResetPassword(!showResetPassword)}
                    >
                        {showResetPassword ? 'Back to Login' : 'Forgot Password?'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginForm;
