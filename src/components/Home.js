import React from 'react'
import {
  Link
} from 'react-router-dom';
import logo from './images/logo512.svg'
import Aos from 'aos';
import { useEffect } from 'react';
import { MdLabelImportant } from "react-icons/md";

export default function Home() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <div>
      <div className="container my-5" data-aos="fade-up">
        <div className="p-5 text-center rounded-3">
          <img src={logo} width='200px' height='200px' alt='logo' />
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
      <section class="section bg-dark py-5">

        <div class="bg-triangle bg-triangle-light bg-triangle-top bg-triangle-left"></div>
        <div class="bg-triangle bg-triangle-light bg-triangle-bottom bg-triangle-right"></div>

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">

              <h2 class="text-white text-center mb-4"  data-aos="fade-down">
              <MdLabelImportant className="text-white" /> Key features
              </h2>

              <p class="text-white mb-5 text-center">
              We take all necessary precautions and follow best practices to ensure the well-being of our customers during every service call.
              </p>

            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-4" data-aos="fade-right">
              <div class="text-center mb-5 mb-md-0">
                <h4 class="text-white mb-3">
                  24/7 Availability
                </h4>

                <p class="text-white mb-0">
                We're always ready to help, day or night, ensuring you're never stranded during emergencies.
                </p>

              </div>
            </div>
            <div class="col-md-4" data-aos="fade-up">
              <div class="text-center mb-5 mb-md-0">

                <h4 class="text-white mb-3">
                Comprehensive Services
                </h4>

                <p class="text-white mb-0">
                We offer a range of services, including jump-starts, tire changes, fuel delivery, and towing, addressing a variety of breakdown situations
                </p>

              </div>

            </div>
            <div class="col-md-4" data-aos="fade-left">

              <div class="text-center">

                {/* <div class="text-primary mb-4">
                  <span class="icon icon-support icon-2x"></span>
                </div> */}

                <h4 class="text-white mb-3">
                Quick Response Times
                </h4>

                <p class="text-white mb-0">
                Our efficient response times mean you'll get back on the road swiftly, minimizing disruptions to your journey.
                </p>

              </div>

            </div>
          </div>
        </div>

      </section>
    </div>
  )
}
