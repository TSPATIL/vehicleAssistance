import React from 'react'

export default function CompletedAppointment(props) {
    const { appoint, viewAppoint, transactAppoint } = props
  return (
    <div className='col-md-3 my-3'>
            <div className="card" style={{width: '19rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Appointment</h5>
                    <hr/>
                    <p className="card-text"><b>Type:</b> {appoint.vType}</p>
                    <p className="card-text"><b>Name:</b> {appoint.vName}</p>
                    <p className="card-text"><b>Brand:</b> {appoint.vCompany}</p>
                    <p className="card-text"><b>Location:</b> {appoint.vPickLocation.lat} {appoint.vPickLocation.lng}</p>
                    <p className="card-text"><b>Transaction Status:</b> {appoint.t_status}</p>
                    <p className="card-text"><b>Transaction cost:</b> {appoint.t_cost}</p>
                    <hr/>
                    {/* <i className="fa-solid fa-caret-down mx-2" onClick={()=>{viewAppoint(appoint)}}></i> */}
                    <button className="btn btn-primary mx-2 col-5" onClick={()=>{viewAppoint(appoint)}} >View</button>
                    {appoint.t_status !== "done" ? <button className="btn btn-primary mx-2 col-5" onClick={()=>{transactAppoint(appoint)}} >Check out</button> : ''}
                </div>
            </div>
        </div>
  )
}
