import React, { useState } from "react";
import { Form, FormContainer, InputLabel } from "./style";
import axios from "axios";
import {Link, redirect} from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const [errors, setErrors] = useState({
        errorMessage: ''
    });

    const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'repeatPassword') {
            setIsRepeatPasswordTouched(true);
            if (isRepeatPasswordTouched && value !== formData.password) {
                setErrors({
                    ...errors,
                    repeatPassword: 'Hasła nie są zgodne'
                });
            } else {
                setErrors({
                    ...errors,
                    repeatPassword: ''
                });
            }
        } else if (name === 'password') {
            if (isRepeatPasswordTouched && value !== formData.repeatPassword) {
                setErrors({
                    ...errors,
                    repeatPassword: 'Hasła nie są zgodne'
                });
            } else {
                setErrors({
                    ...errors,
                    repeatPassword: ''
                });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            setErrors({
                ...errors,
                repeatPassword: 'Hasła nie są zgodne'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            console.log(response.data);
            setErrors({
                ...errors,
                errorMessage: response.data.message
            });
            if (response.data.status){
                setInterval(()=>{
                    redirect('/login')
                },1500)
            }
        } catch (error) {
            console.error(error);
            setErrors({
                ...errors,
                errorMessage: 'An error occurred during registration'
            });
        }

    };

    return (
        <div>
            <FormContainer>
                <Form onSubmit={handleSubmit} method="POST">
                    <InputLabel>
                        <p>Username:</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </InputLabel>
                    <InputLabel>
                        <p>Email:</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </InputLabel>
                    <InputLabel>
                        <p>Password:</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </InputLabel>
                    <InputLabel>
                        <p>Repeat password:</p>
                        <input
                            type="password"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            onBlur={() => setIsRepeatPasswordTouched(true)}
                        />
                    </InputLabel>
                    {errors.errorMessage && (
                        <p style={{ color: 'red' }}>{errors.errorMessage}</p>
                    )}
                    <button type="submit">Register</button>
                    <Link to={'/login'}>
                        <p>Already have account</p>
                    </Link>
                </Form>
            </FormContainer>
        </div>
    );
};

export default Register;
