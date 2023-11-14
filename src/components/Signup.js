import React, { useState } from 'react'
import {
  Link, useNavigate
} from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", usertype: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, usertype: credentials.usertype, email: credentials.email, password: credentials.password, cpassword: credentials.cpassword })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to login
      navigate('/login');
    }
    else {
      alert(json.error);
    }
  }
  return (
    <div className="col-md-10 mx-auto col-lg-3 my-5">
      <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
        <h3 className='text-center mb-4'>Sign Up</h3>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput1" name='name' value={credentials.name} placeholder="Full Name" onChange={handleonChange} />
          <label htmlFor="floatingInput">Full Name</label>
        </div>
        <select className="form-select mb-3" aria-label="Default select example" name='usertype' value={credentials.usertype} onChange={handleonChange}>
          <option defaultValue={0}>Choose Account Type</option>
          <option value="User">User</option>
          <option value="Mechanic">Mechanic</option>
        </select>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput2" name='email' value={credentials.email} placeholder="name@example.com" onChange={handleonChange} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="floatingPassword1" name='password' value={credentials.password} placeholder="Password" onChange={handleonChange} />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="floatingPassword2" name='cpassword' value={credentials.cpassword} placeholder="Confirm Password" onChange={handleonChange} />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Signup</button>
        <hr className="my-4" />
        <small className="text-body-secondary">Already have account? - <Link to="/login">Click here</Link></small>
      </form>
    </div>
  )
}
