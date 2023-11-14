import React, { useContext } from 'react'
import statusContext from '../context/status/statusContext'

export default function RejectApproval(props) {
  const context = useContext(statusContext);
  const { deleteApproval } = context;
  const { approval, updateAcceptedApprovals, viewApproval } = props
  return (
    <div className='col-md-3 my-3'>
            <div className="card" style={{width: '80rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Approval</h5>
                    <hr/>
                    <p className="card-text"><b>Name:</b> {approval.mName}</p>
                    <p className="card-text"><b>Email:</b> {approval.mEmail}</p>
                    <p className="card-text"><b>Garage:</b> {approval.mGarageName}</p>
                    <p className="card-text"><b>Status:</b> {approval.m_status}</p>
                    <hr/>
                    <button className="btn btn-primary mx-2 col-3" onClick={()=>{viewApproval(approval)}}>View</button>
                    <button className="btn btn-primary mx-2 col-3" onClick={()=>{updateAcceptedApprovals(approval)}}>Accept</button>
                    <button className="btn btn-primary mx-2 col-3" onClick={()=>{deleteApproval(approval._id)}}>Delete</button>
                </div>
            </div>
        </div>
  )
}
