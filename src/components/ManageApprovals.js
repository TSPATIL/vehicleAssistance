import React, { useContext, useEffect, useRef, useState } from 'react'
import AcceptApproval from './AcceptApproval';
import RejectApproval from './RejectApproval';
import CompletedApprovals from './CompletedApprovals';
import statusContext from '../context/status/statusContext';

export default function ManageApprovals() {
  const [approval, setApproval] = useState({ eid: '', emName: '', emEmail: '', emContactNo: '', emAddress: '', emCountry: '', emState: '', emPincode: '', emType: '', emGarageName: '', emGarageEmail: '', emGarageContactNo: '', emGarageAddress: '', emLocation: '' })
  const [btnradio, setBtnradio] = useState(1);
  const context = useContext(statusContext);
  const refView = useRef(null)
  const { approvals, getNApprovedApprovals, getRejectedApprovals, getApprovedApprovals, updateApprovalstatus } = context;
  const handleonRadioChange = (e) => {
    if (document.getElementById('btnradio1').checked === true) {
      setBtnradio(1)
    }
    if (document.getElementById('btnradio2').checked === true) {
      setBtnradio(2)
    }
    if (document.getElementById('btnradio3').checked === true) {
      setBtnradio(3)
    }
  }

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setApproval({ ...approval, [e.target.name]: e.target.value });
  }

  const viewApproval = (currentAppoint) => {
    refView.current.click();
    setApproval({ eid: currentAppoint._id, emName: currentAppoint.mName, emEmail: currentAppoint.mEmail, emContactNo: currentAppoint.mContactNo, emAddress: currentAppoint.mAddress, emCountry: currentAppoint.mCountry, emState: currentAppoint.mState, emPincode: currentAppoint.mPincode, emType: currentAppoint.mType, emGarageName: currentAppoint.mGarageName, emGarageEmail: currentAppoint.mGarageEmail, emGarageContactNo: currentAppoint.mGarageContactNo, emGarageAddress: currentAppoint.mGarageAddress, emLocation: currentAppoint.mLocation })
  }

  const updateAcceptedApprovals = (currentAppoint) => {
    setApproval({ eid: currentAppoint._id, emName: currentAppoint.mName, emEmail: currentAppoint.mEmail, emContactNo: currentAppoint.mContactNo, emAddress: currentAppoint.mAddress, emCountry: currentAppoint.mCountry, emState: currentAppoint.mState, emPincode: currentAppoint.mPincode, emType: currentAppoint.mType, emGarageName: currentAppoint.emGarageName, emGarageEmail: currentAppoint.emGarageEmail, emGarageContactNo: currentAppoint.mGarageContactNo, emGarageAddress: currentAppoint.mGarageAddress, emLocation: currentAppoint.mLocation })
    console.log("Updating the current approval, new approval: ", approval);
    let m_status = 'accepted'
    updateApprovalstatus(approval.eid, approval.emName, approval.emEmail, approval.emContactNo, approval.emAddress, approval.emCountry, approval.emState, approval.emPincode, approval.emType, approval.emGarageName, approval.emGarageEmail, approval.emGarageContactNo, approval.emGarageAddress, approval.emLocation, m_status)
  }
  const updateRejectedApprovals = (currentAppoint) => {
    setApproval({ eid: currentAppoint._id, emName: currentAppoint.mName, emEmail: currentAppoint.mEmail, emContactNo: currentAppoint.mContactNo, emAddress: currentAppoint.mAddress, emCountry: currentAppoint.mCountry, emState: currentAppoint.mState, emPincode: currentAppoint.mPincode, emType: currentAppoint.mType, emGarageName: currentAppoint.emGarageName, emGarageEmail: currentAppoint.emGarageEmail, emGarageContactNo: currentAppoint.mGarageContactNo, emGarageAddress: currentAppoint.mGarageAddress, emLocation: currentAppoint.mLocation })
    console.log("Updating the current approval, new approval: ", approval);
    let m_status = 'rejected'
    updateApprovalstatus(approval.eid, approval.emName, approval.emEmail, approval.emContactNo, approval.emAddress, approval.emCountry, approval.emState, approval.emPincode, approval.emType, approval.emGarageName, approval.emGarageEmail, approval.emGarageContactNo, approval.emGarageAddress, approval.emLocation, m_status)
  }

  const handleAcceptAppoint = () => {
    getNApprovedApprovals();
  }
  const handleSubmitAppoint = () => {
    getRejectedApprovals();
  }
  const handleCompleteAppoint = () => {
    getApprovedApprovals();
  }

  useEffect(() => {
    document.getElementById('btnradio1').checked = true
    getNApprovedApprovals();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="container my-5">
        <div className="py-4 text-center">
          <h2>Mechanic Approvals</h2>
        </div>
        <hr className="mb-4" />
        <div className="btn-group col-12" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onClick={handleAcceptAppoint} onChange={handleonRadioChange} />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">Accept</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={handleSubmitAppoint} onChange={handleonRadioChange} />
          <label className="btn btn-outline-primary" htmlFor="btnradio2">Ongoing</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio3" onClick={handleCompleteAppoint} onChange={handleonRadioChange} />
          <label className="btn btn-outline-primary" htmlFor="btnradio3">Completed</label>
        </div>
        <hr className="mb-4" />
        {
          btnradio === 1 ?
            <div className='container row my-3'>
              {
                !localStorage.getItem('token') ? <div className='container my-3'>Login to check appointments</div> :
                  approvals.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    approvals.map((approval) => {
                      return <AcceptApproval key={approval._id} approval={approval} updateAcceptedApprovals={updateAcceptedApprovals} updateRejectedApprovals={updateRejectedApprovals} viewApproval={viewApproval} />
                    })
              }
            </div> :
            null
        }
        {
          btnradio === 2 ?
            <div className='container row my-3'>
              {
                !localStorage.getItem('token') ? <div className='container my-3'>Login to check appointments</div> :
                  approvals.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    approvals.map((approval) => {
                      return <RejectApproval key={approval._id} approval={approval} updateAcceptedApprovals={updateAcceptedApprovals} viewApproval={viewApproval} />
                    })
              }
            </div> :
            null
        }
        {
          btnradio === 3 ?
            <div className='container row my-3'>
              {
                !localStorage.getItem('token') ? <div className='container my-3'>Login to check appointments</div> :
                  approvals.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    approvals.map((approval) => {
                      return <CompletedApprovals key={approval._id} approval={approval} viewApproval={viewApproval} updateRejectedApprovals={updateRejectedApprovals} />
                    })
              }
            </div> :
            null
        }
      </div>


    {/* //View Approval */}
    <button type="button" ref={refView} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">View Appointment</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form className="needs-validation" noValidate="">
                  <h3 className="mb-3">Fill Manager Details</h3>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="mname" className="form-label">Full Name</label>
                      <div className="input-group has-validation">
                        <input type="text" className="form-control" id="mname" placeholder="Lastname    Firstname    Middlename" required="" name='emName' onChange={handleOnChange} value={approval.emName} />
                        <div className="invalid-feedback">
                          Your fullname is required.
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="memail" className="form-label">Email</label>
                      <input type="email" className="form-control" id="memail" placeholder="you@example.com" name='emEmail' onChange={handleOnChange} value={approval.emEmail} />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="mcontact" className="form-label">Contact No.</label>
                      <input type="text" className="form-control" id="mcontact" placeholder="1234567890" name='emContactNo' onChange={handleOnChange} value={approval.emContactNo} />
                      <div className="invalid-feedback">
                        Please enter a valid mobile no. for shipping updates.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="maddress" className="form-label">Residental Address</label>
                      <input type="text" className="form-control" id="maddress" placeholder="1234 Main St" required="" name='emAddress' onChange={handleOnChange} value={approval.emAddress} />
                      <div className="invalid-feedback">
                        Please enter your Residental address.
                      </div>
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="mcountry" className="form-label">Country</label>
                      <select className="form-select" id="mcountry" required="" name='emCountry' onChange={handleOnChange} value={approval.emCountry}>
                        <option value="">Choose...</option>
                        <option>United States</option>
                        <option>India</option>
                        <option>United Kingdom</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="mstate" className="form-label">State</label>
                      <select className="form-select" id="mstate" required="" name='emState' onChange={handleOnChange} value={approval.emState}>
                        <option value="">Choose...</option>
                        <option>California</option>
                        <option>Maharashtra</option>
                        <option>London</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="mzip" className="form-label">Zip</label>
                      <input type="text" className="form-control" id="mzip" placeholder="" required="" name='emPincode' onChange={handleOnChange} value={approval.emPincode} />
                      <div className="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <h3 className="mb-3">Fill Garage Details</h3>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="mtype" className="form-label">Type</label>
                      <select className="form-select" id="mtype" required="" name='emType' onChange={handleOnChange} value={approval.emType}>
                        <option value="">Choose...</option>
                        <option>Individual</option>
                        <option>Employee</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid type.
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="mgname" className="form-label">Name</label>
                      <div className="input-group has-validation">
                        <input type="text" className="form-control" id="mgname" placeholder="Name" required="" name='emGarageName' onChange={handleOnChange} value={approval.emGarageName} />
                        <div className="invalid-feedback">
                          Your vehiclename is required.
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="mgemail" className="form-label">Email</label>
                      <input type="email" className="form-control" id="mgemail" placeholder="Email" name='emGarageEmail' onChange={handleOnChange} value={approval.emGarageEmail} />
                      <div className="invalid-feedback">
                        Please enter a valid email.
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="mgcontact" className="form-label">Contact No.</label>
                      <input type="text" className="form-control" id="mgcontact" placeholder="Contact No." name='emGarageContactNo' onChange={handleOnChange} value={approval.emGarageContactNo} />
                      <div className="invalid-feedback">
                        Please enter a valid company.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="mgaddress" className="form-label">Address</label>
                      <input type="text" className="form-control" id="mgaddress" placeholder="Address" name='emGarageAddress' onChange={handleOnChange} value={approval.emGarageAddress} />
                      <div className="invalid-feedback">
                        Please enter a valid address.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="mlocation" className="form-label">Location</label>
                      <input type="text" className="form-control" id="mlocation" placeholder="Enter location of garage" name='emLocation' onChange={handleOnChange} value={approval.emLocation} />
                      <div className="invalid-feedback">
                        Please enter a valid Location.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
