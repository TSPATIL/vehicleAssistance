import React from 'react'
import {
  Link
} from 'react-router-dom';
import logo from './images/logo512.svg'

export default function Home() {
  return (
    <div>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <img src={logo} width='200px'height='200px' alt='logo' />
          <h1 className="text-body-emphasis">Welcome to VAssist!</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            This is a assistance platform for vehicles that has been suffered with sudden issue. Use this platform to turn uncomfortable situation into Comfortable one easily. Start yor journey!
          </p>
          <div className="d-inline-flex gap-2 mb-5">
            <Link className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" role="button" to='/book'>
              Book Appointment
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </Link>
            <Link className="btn btn-outline-secondary btn-lg px-4 rounded-pill" role="button" to='/contact'>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
