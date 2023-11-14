import React, { useContext } from 'react'
import statusContext from '../context/status/statusContext'

export default function StatusItem(props) {
    const context = useContext(statusContext);
    const { deleteApproval } = context;
    const { approval, updateApprovals, viewApproval } = props
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
                    <i className="fa-solid fa-caret-down mx-2" onClick={()=>{viewApproval(approval)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateApprovals(approval)}}></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteApproval(approval._id)}}></i>
                </div>
            </div>
        </div>
    )
}
