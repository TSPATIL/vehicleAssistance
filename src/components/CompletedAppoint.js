import React from 'react'

export default function CompletedAppoint(props) {
  const { appoint, viewAppoint } = props;
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
        <p className="card-text"><b>Appointment Status</b> {appoint.a_status}</p>
        <p className="card-text"><b>Transaction Status</b> {appoint.t_status}</p>
        <p className="card-text"><b>Transaction cost:</b> {appoint.t_cost}</p>
        <hr />
        <button className="btn btn-primary mx-2 col-11" onClick={()=>{viewAppoint(appoint)}} >View</button>
      </div>
    </div>
    </div>
  )
}
