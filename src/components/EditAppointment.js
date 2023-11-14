import React, { useContext } from 'react'
import appointContext from '../context/appointments/appointContext'

export default function EditAppointment(props) {
  const context = useContext(appointContext);
  const { deleteAppoint } = context;
  const { appoint, updateAppoints, viewAppoint } = props
  return (
    <div className='col-md-3 my-3'>
      <div className="card" style={{ width: '19rem' }}>
        <div className="card-body">
          <h5 className="card-title">Appointment</h5>
          <hr />
          <p className="card-text"><b>Type:</b> {appoint.vType}</p>
          <p className="card-text"><b>Name:</b> {appoint.vName}</p>
          <p className="card-text"><b>Brand:</b> {appoint.vCompany}</p>
          <p className="card-text"><b>Location:</b> {appoint.vPickLocation}</p>
          <hr />
          <i className="fa-solid fa-caret-down mx-2" onClick={() => { viewAppoint(appoint) }}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateAppoints(appoint) }}></i>
          <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteAppoint(appoint._id) }}></i>
        </div>
      </div>
    </div>
  )
}
