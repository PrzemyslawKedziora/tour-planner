import React, { useState } from "react";
import {Form, FormContainer, InputLabel} from "./style";

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            setErrors({
                ...errors,
                repeatPassword: 'Hasła nie są zgodne'
            });
            return;
        }

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        }).then(res => res.json()).then(res=>{
            console.log(res)
            setErrors({
                ...errors,
                repeatPassword: res.message
            })
        });

        console.log('Formularz został wysłany:', formData);
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
                            onBlur={() => setIsRepeatPasswordTouched(true)} // Set touched on blur as well
                        />
                    </InputLabel>
                    {errors.errorMessage && (
                        <p style={{color: 'red'}}>{errors.errorMessage}</p>
                    )}
                    <button type="submit">Register</button>
                </Form>
            </FormContainer>
        </div>
    );
}

export default Register;
