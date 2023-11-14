import React, { useState } from 'react'
import {
    Link, useNavigate
} from 'react-router-dom';


export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleonChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response1 = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json1 = await response1.json();
        console.log(json1);
        if (json1.success) {
            //redirect to login
            localStorage.setItem('token', json1.authToken)
            const response2 = await fetch('http://127.0.0.1:5000/api/auth/getuser', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json2 = await response2.json();
            console.log(json2);
            localStorage.setItem('usertype', json2.usertype);
            navigate('/');
        }
        else {
            alert(json1.error);
        }
    }
    return (
        <div className="col-md-10 mx-auto col-lg-3 my-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                <h3 className='text-center mb-4'>Login</h3>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' value={credentials.email} onChange={handleonChange} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={credentials.password} onChange={handleonChange} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                <hr className="my-4" />
                <small className="text-body-secondary">Don't have account? - <Link to="/signup">Click here</Link></small>
            </form>
        </div>
    )
}