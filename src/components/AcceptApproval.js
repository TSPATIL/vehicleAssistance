import React from 'react'

export default function AcceptApproval(props) {
  const { approval, updateAcceptedApprovals, updateRejectedApprovals, viewApproval } = props
  return (
    <div className='col-md-3 my-3'>
            <div className="card" style={{width: '19rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Approval</h5>
                    <hr/>
                    <p className="card-text"><b>Name:</b> {approval.mName}</p>
                    <p className="card-text"><b>Email:</b> {approval.mEmail}</p>
                    <p className="card-text"><b>Garage:</b> {approval.mGarageName}</p>
                    <p className="card-text"><b>Status:</b> {approval.m_status}</p>
                    <hr/>
                    <button className="btn btn-primary mx-2 col-5" onClick={()=>{viewApproval(approval)}}>View</button>
                    <button className="btn btn-primary mx-2 col-5" onClick={()=>{updateAcceptedApprovals(approval)}}>Accept</button>
                    <button className="btn btn-primary mx-2 col-5" onClick={()=>{updateRejectedApprovals(approval)}}>Reject</button>
                </div>
            </div>
        </div>
  )
}
