import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";
import "./Login.css";
import { body } from 'express-validator';

const Login = ({ authenticateUser }) => {
   let history = useHistory();
   const [userData, setUserData] = useState ({
       email: '',
       password: ''
   });
   const [errorData, setErrorData] = useState({ errors: null });

   const { email, password } = userData;
   const { errors } = errorData;

   const onChange = e => {
       const { name, value } = e.target;
       setUserData({
           ...userData,
           [name]: value
       })
   }

const loginUser = async () => {
    const newUser = {
        email: email,
        password: password
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/api/login', body, config);

        localStorage.setItem('token', res.data.token);
        history.push('/');
    } catch (error) {
        localStorage.removeItem('token');

        setErrorData({
            ...errors,
            errors: error.response.data.errors
        })
    }

    authenticateUser();
}
    return (
        <body id = "Login">
            
        <div id = "logData">
        <div class = "title2">
            <h2 class = "log" >Log In</h2>
        </div>
            <div>
                <input
                    class = "form_input"
                    type = "text"
                    placeholder = "Email"
                    name = "email"
                    value = {email}
                    onChange = {e => onChange(e)} />
            </div>
            <div>
                <input
                    class = "form_input"
                    type = "text"
                    placeholder = "Password"
                    name = "password"
                    value = {password}
                    onChange = {e => onChange(e)} />
            </div>
            <div>
                <button class = "submit" onClick={() => loginUser()}>Log In</button>
            </div>
            <div>
                {errors && errors.map(error =>
                    <div key = {error.msg}>{error.msg} </div>)}
            </div>
        </div>

        </body>
    )

}

export default Login;