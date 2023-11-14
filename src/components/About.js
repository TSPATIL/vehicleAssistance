import React from 'react'
import './About.css'

export default function About() {

  return (
    <>
      <header className="bg-dark text-white text-center">
        <h1 className="display-4 shadowed-title about-us-title">About Us</h1>
      </header>

      <h2 className="text-center mt-2">Get Back on Road Safely</h2>
      <p className="text-center">We take all necessary precautions and follow best practices to ensure the well-being of our customers during every service call.</p>
      <div className="container my-3" style={{ padding: '2rem' }}>
        <div className="row">
          <div className="col-lg-6">
            <div className="custom-card">
              <h2>Vehicle Breakdown Assistance System</h2>
              <p>
                We're your 24/7 lifeline for vehicle breakdowns and emergencies. <br />
                Our mission is to ensure your safety and get you back on the road quickly. <br />
                Our expert team provides nationwide coverage, fast response, and <br />customer-focused services.
                Join our community for peace of mind on the road. Contact us anytime for assistance or inquiries.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="custom-card">
              <h2>Purpose</h2>
              <p>
                The purpose of the Vehicle Breakdown Assistance System is to provide rapid and reliable aid to drivers experiencing vehicle breakdowns and emergencies.<br />
                It ensures the safety and convenience of drivers by offering immediate assistance, allowing them to resume their journeys with minimal disruption.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Additional container with the same size --> */}
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-6 ">
            <div className="custom-card overflow-y-scroll" style={{ overflow: 'auto' }}>
              <h2>Key Features</h2>
              <b>24/7 Availability:</b><br />
              <p>We're always ready to help, day or night, ensuring you're never stranded during emergencies.</p>
              <b>Quick Response Times:</b><br />
              <p>Our efficient response times mean you'll get back on the road swiftly, minimizing disruptions to your journey.</p>
              <b>Skilled Professionals:</b><br />
              <p>Our team of skilled professionals is equipped to handle a range of breakdown scenarios, ensuring your safety and peace of mind.</p>
              <b>Comprehensive Services:</b><br />
              <p>We offer a range of services, including jump-starts, tire changes, fuel delivery, and towing, addressing a variety of breakdown situations.</p>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="custom-card">
              <h2>Contact Us</h2>
              <p>
                Tanmay Patil- tanmay@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
