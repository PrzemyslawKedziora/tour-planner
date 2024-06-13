import { useState } from "react";
import axios from "axios";
import {Link, redirect, useNavigate} from "react-router-dom";
import {Form, FormContainer, InputLabel} from "./style";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage,setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const logIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: formData.email,
                password: formData.password
            });
            const dataAboutUser = response.data;
            if (dataAboutUser.status) {
                sessionStorage.setItem('key', dataAboutUser.token);
                sessionStorage.setItem('id', dataAboutUser.userId);
                navigate('/tour-creator');
            } else {
                setErrorMessage(dataAboutUser.data || 'Error logging in');
            }
            console.log(dataAboutUser)
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("An error occurred during login. Please try again.");
        }
    };

    return (
        <div>
            <FormContainer>
                <Form onSubmit={logIn}>
                    <p>Login</p>
                    <InputLabel>
                        <p>Email:</p>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </InputLabel>
                    <InputLabel>
                        <p>Password:</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </InputLabel>
                    {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}
                    <button type="submit">Log in</button>
                    <Link to={'/register'}>
                        <p>Create Account</p>
                    </Link>
                </Form>
            </FormContainer>
        </div>
    );
};

export default Login;
