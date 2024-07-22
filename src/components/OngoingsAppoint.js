import React from 'react'

export default function OngoingsAppoint(props) {
  const { appoint, submitAppoint, viewAppoint } = props;
  return (
    <div className='col-md-3 my-3'>
      <div className="card" style={{ width: "19rem" }}>
        <div className="card-body">
          <h5 className="card-title">Appointment</h5>
          <hr />
          <p className="card-text"><b>Type:</b> {appoint.vType}</p>
          <p className="card-text"><b>Name:</b> {appoint.vName}</p>
          <p className="card-text"><b>Brand:</b> {appoint.vCompany}</p>
          <p className="card-text"><b>Location:</b> {appoint.vPickLocation.lat} {appoint.vPickLocation.lng}</p>
          <p className="card-text"><b>Status</b> {appoint.a_status}</p>
          <hr />
          <button className="btn btn-primary mx-2 col-5" onClick={() => { viewAppoint(appoint) }} >View</button>
          <button className="btn btn-primary mx-2 col-5" onClick={() => { submitAppoint(appoint) }}>Submit</button>
        </div>
      </div>
    </div>
  )
}
