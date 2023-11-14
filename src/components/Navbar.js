import React from 'react'
import {
    Link, useLocation, useNavigate
} from 'react-router-dom';
import logo from './images/logo512.svg'


export default function Navbar() {
    const navigate = useNavigate();
    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        navigate('/');
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-sm bg-success sticky-top" data-bs-theme="dark" style={{ height: "80px" }}>
            <div className="container-fluid">
                <Link className="navbar-brand mx-3" to="/"><img src={logo} width='100px'height='100px' alt='Logo' /></Link>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav col-lg justify-content-lg-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'? "active": ""} mx-2`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/book'? "active": ""} mx-2`} to="/book">Book</Link>
                        </li>
                        <li className="nav-item dropdown-center">
                            <Link className="nav-link dropdown-toggle mx-2" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </Link>
                            <ul className="dropdown-menu">
                                {
                                localStorage.getItem('usertype') === 'Mechanic' ? <div>
                                <li><Link className="dropdown-item" to="/approval">Approval</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="/status">Status</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="/mAppoint">Manage Appointments</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                </div>
                                :
                                null
                                }
                                {
                                    localStorage.getItem('usertype') === 'admin' ? 
                                    <div>
                                        <li><Link className="dropdown-item" to="/mApproval">Manage Approvals</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                    </div>
                                    : 
                                    null
                                }
                                <li><Link className="dropdown-item" to="/appointments">Your Appointments</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="/transactions">Transactions</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/contact'? "active": ""} mx-2`} to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'? "active": ""} mx-2`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?
                    <Link className="btn btn-outline-light btn-lg mx-5" role="button" to="/login">Login</Link> :
                    <button className="btn btn-outline-light btn-lg mx-5" type="button" onClick={handleLogOut}>Logout</button>}
                    {/* <Link className="btn btn-outline-light btn-lg mx-5" role="button" to="/login">Login</Link> */}
                </div>
            </div>
        </nav>
    )
}
