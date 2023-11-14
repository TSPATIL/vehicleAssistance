import React, { useRef, useState } from 'react'
import appointContext from '../context/appointments/appointContext'
import { useContext, useEffect } from 'react';
import AcceptsAppoint from './AcceptsAppoint';
import CompletedAppoint from './CompletedAppoint';
import OngoingsAppoint from './OngoingsAppoint';

export default function ManagesAppoint() {
  const [book, setBook] = useState({ eid: '', evOwnerName: '', evOwnerEmail: '', evOwnerContactNo: '', evOwnerAddress: '', evOwnerCountry: '', evOwnerState: '', evOwnerPincode: '', evDriverName: '', evDriverEmail: '', evDriverContactNo: '', evType: '', evName: '', evCompany: '', evRegisteredNo: '', evPickLocation: '', eomcomment: '', eammount: '' })
  const context = useContext(appointContext);
  const [btnradio, setBtnradio] = useState(1);
  const refView = useRef(null)
  const refClose = useRef(null)
  const ref = useRef(null)

  const { appoints, getNAcceptedAppoints, updateAppointStatus, getAcceptedInAppoints, getAcceptedComAppoints } = context;

  const handleAcceptAppoint = () => {
    getNAcceptedAppoints();
  }
  const handleSubmitAppoint = () => {
    getAcceptedInAppoints();
  }
  const handleCompleteAppoint = () => {
    getAcceptedComAppoints();
  }
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
  useEffect(() => {
    document.getElementById('btnradio1').checked = true
    getNAcceptedAppoints();
    // eslint-disable-next-line
  }, [])

  const handleOnChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  const viewAppoint = (currentAppoint) => {
    refView.current.click();
    setBook({ eid: currentAppoint._id, evOwnerName: currentAppoint.vOwnerName, evOwnerEmail: currentAppoint.vOwnerEmail, evOwnerContactNo: currentAppoint.vOwnerContactNo, evOwnerAddress: currentAppoint.vOwnerAddress, evOwnerCountry: currentAppoint.vOwnerCountry, evOwnerState: currentAppoint.vOwnerState, evOwnerPincode: currentAppoint.vOwnerPincode, evDriverName: currentAppoint.vDriverName, evDriverEmail: currentAppoint.vDriverEmail, evDriverContactNo: currentAppoint.vDriverContactNo, evType: currentAppoint.vType, evName: currentAppoint.vName, evCompany: currentAppoint.vCompany, evRegisteredNo: currentAppoint.vRegisteredNo, evPickLocation: currentAppoint.vPickLocation, eomcomment: currentAppoint.omcomment, eammount: currentAppoint.t_cost })
  }

  const acceptAppoint = (currentAppoint) => {
    setBook({ eid: currentAppoint._id, evOwnerName: currentAppoint.vOwnerName, evOwnerEmail: currentAppoint.vOwnerEmail, evOwnerContactNo: currentAppoint.vOwnerContactNo, evOwnerCountry: currentAppoint.vOwnerCountry, evOwnerState: currentAppoint.vOwnerState, evOwnerPincode: currentAppoint.vOwnerPincode, evDriverName: currentAppoint.vDriverName, evDriverEmail: currentAppoint.vDriverEmail, evDriverContactNo: currentAppoint.vDriverContactNo, evType: currentAppoint.vType, evName: currentAppoint.vName, evCompany: currentAppoint.vCompany, evRegisteredNo: currentAppoint.vRegisteredNo, evPickLocation: currentAppoint.vPickLocation, eomcomment: currentAppoint.omcomment })
    const a_status = "accepted";
    updateAppointStatus(currentAppoint._id, currentAppoint.vOwnerName, currentAppoint.vOwnerEmail, currentAppoint.vOwnerContactNo, currentAppoint.vOwnerAddress, currentAppoint.vOwnerCountry, currentAppoint.vOwnerState, currentAppoint.vOwnerPincode, currentAppoint.vDriverName, currentAppoint.vDriverEmail, currentAppoint.vDriverContactNo, currentAppoint.vType, currentAppoint.vName, currentAppoint.vCompany, currentAppoint.vRegisteredNo, currentAppoint.vPickLocation, currentAppoint.omcomment, a_status);
  }

  const submitAppoint = (currentAppoint) => {
    setBook({ eid: currentAppoint._id, evOwnerName: currentAppoint.vOwnerName, evOwnerEmail: currentAppoint.vOwnerEmail, evOwnerContactNo: currentAppoint.vOwnerContactNo, evOwnerCountry: currentAppoint.vOwnerCountry, evOwnerState: currentAppoint.vOwnerState, evOwnerPincode: currentAppoint.vOwnerPincode, evDriverName: currentAppoint.vDriverName, evDriverEmail: currentAppoint.vDriverEmail, evDriverContactNo: currentAppoint.vDriverContactNo, evType: currentAppoint.vType, evName: currentAppoint.vName, evCompany: currentAppoint.vCompany, evRegisteredNo: currentAppoint.vRegisteredNo, evPickLocation: currentAppoint.vPickLocation, eomcomment: currentAppoint.omcomment, eammount: currentAppoint.t_cost })
    ref.current.click();
  }

  const handleSubmit = () => {
    const a_status = "completed"
    console.log(book)
    updateAppointStatus(book.eid, book.evOwnerName, book.evOwnerEmail, book.evOwnerContactNo, book.evOwnerAddress, book.evOwnerCountry, book.evOwnerState, book.evOwnerPincode, book.evDriverName, book.evDriverEmail, book.evDriverContactNo, book.evType, book.evName, book.evCompany, book.evRegisteredNo, book.evPickLocation, book.eomcomment, a_status, book.eammount);
    refClose.current.click();
  }

  return (
    <>
      <div className="container my-5">
        <div className="py-4 text-center">
          <h2>Appointments</h2>
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
                  appoints.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    appoints.map((appoint) => {
                      return <AcceptsAppoint key={appoint._id} appoint={appoint} viewAppoint={viewAppoint} acceptAppoint={acceptAppoint} />
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
                  appoints.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    appoints.map((appoint) => {
                      return <OngoingsAppoint key={appoint._id} appoint={appoint} viewAppoint={viewAppoint} submitAppoint={submitAppoint} />
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
                  appoints.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                    appoints.map((appoint) => {
                      return <CompletedAppoint key={appoint._id} appoint={appoint} viewAppoint={viewAppoint} />
                    })
              }
            </div> :
            null
        }
      </div>



      {/* // View Modal */}
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
              <div className='container'>
                <main>
                  <div className="container">
                    <form className="needs-validation" noValidate="">
                      <h3 className="mb-3">Fill Owner Details</h3>
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="oname" className="form-label">Full Name</label>
                          <div className="input-group has-validation">
                            <input type="text" className="form-control" id="oname" placeholder="Lastname    Firstname    Middlename" required="" name='evOwnerName' onChange={handleOnChange} value={book.evOwnerName} />
                            <div className="invalid-feedback">
                              Your fullname is required.
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="oemail" className="form-label">Email</label>
                          <input type="email" className="form-control" id="oemail" placeholder="you@example.com" name='evOwnerEmail' onChange={handleOnChange} value={book.evOwnerEmail} />
                          <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="ocontact" className="form-label">Contact No.</label>
                          <input type="text" className="form-control" id="ocontact" placeholder="1234567890" name='evOwnerContactNo' onChange={handleOnChange} value={book.evOwnerContactNo} />
                          <div className="invalid-feedback">
                            Please enter a valid mobile no. for shipping updates.
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="oaddress" className="form-label">Residental Address</label>
                          <input type="text" className="form-control" id="oaddress" placeholder="1234 Main St" required="" name='evOwnerAddress' onChange={handleOnChange} value={book.evOwnerAddress} />
                          <div className="invalid-feedback">
                            Please enter your Residental address.
                          </div>
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="ocountry" className="form-label">Country</label>
                          <select className="form-select" id="ocountry" required="" name='evOwnerCountry' onChange={handleOnChange} value={book.evOwnerCountry}>
                            <option value="">Choose...</option>
                            <option value={'United States'}>United States</option>
                            <option value={'India'}>India</option>
                            <option value={'United Kingdom'}>United Kingdom</option>
                          </select>
                          <div className="invalid-feedback">
                            Please select a valid country.
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="ostate" className="form-label">State</label>
                          <select className="form-select" id="ostate" required="" name='evOwnerState' onChange={handleOnChange} value={book.evOwnerState}>
                            <option value="">Choose...</option>
                            <option value={'California'}>California</option>
                            <option value={'Maharashtra'}>Maharashtra</option>
                            <option value={'London'}>London</option>
                          </select>
                          <div className="invalid-feedback">
                            Please provide a valid state.
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="ozip" className="form-label">Zip</label>
                          <input type="text" className="form-control" id="ozip" placeholder="" required="" name='evOwnerPincode' onChange={handleOnChange} value={book.evOwnerPincode} />
                          <div className="invalid-feedback">
                            Zip code required.
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <h3 className="mb-3">Fill Driver Details</h3>
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="dname" className="form-label">Full Name</label>
                          <div className="input-group has-validation">
                            <input type="text" className="form-control" id="dname" placeholder="Lastname    Firstname    Middlename" required="" name='evDriverName' onChange={handleOnChange} value={book.evDriverName} />
                            <div className="invalid-feedback">
                              Your fullname is required.
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="demail" className="form-label">Email</label>
                          <input type="email" className="form-control" id="demail" placeholder="you@example.com" name='evDriverEmail' onChange={handleOnChange} value={book.evDriverEmail} />
                          <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="dcontact" className="form-label">Contact No.</label>
                          <input type="text" className="form-control" id="dcontact" placeholder="1234567890" name='evDriverContactNo' onChange={handleOnChange} value={book.evDriverContactNo} />
                          <div className="invalid-feedback">
                            Please enter a valid mobile no. for shipping updates.
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <h3 className="mb-3">Fill Vehcile Details</h3>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <label htmlFor="vtype" className="form-label">Type</label>
                          <select className="form-select" id="vtype" required="" name='evType' onChange={handleOnChange} value={book.evType}>
                            <option value="">Choose...</option>
                            <option value={'car'}>Car</option>
                            <option value={'Bike'}>Bike</option>
                            <option value={'Truck'}>Truck</option>
                            <option value={'Tempo'}>Tempo</option>
                            <option value={'Scooter'}>Scooter</option>
                            <option value={'Bus'}>Bus</option>
                          </select>
                          <div className="invalid-feedback">
                            Please select a valid type.
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="vname" className="form-label">Name</label>
                          <div className="input-group has-validation">
                            <input type="text" className="form-control" id="vname" placeholder="Ertiga" required="" name='evName' onChange={handleOnChange} value={book.evName} />
                            <div className="invalid-feedback">
                              Your vehiclename is required.
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="vcompany" className="form-label">Brand</label>
                          <input type="text" className="form-control" id="vcompany" placeholder="Maharuti Suzuki" name='evCompany' onChange={handleOnChange} value={book.evCompany} />
                          <div className="invalid-feedback">
                            Please enter a valid company.
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="vregistration" className="form-label">Registeration No</label>
                          <input type="text" className="form-control" id="vregistration" placeholder="AB: 01 XY: 1234" name='evRegisteredNo' onChange={handleOnChange} value={book.evRegisteredNo} />
                          <div className="invalid-feedback">
                            Please enter a valid registeration no.
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="vlocation" className="form-label">Location</label>
                          <input type="text" className="form-control" id="vlocation" placeholder="Enter location of vehicle" name='evPickLocation' onChange={handleOnChange} value={book.evPickLocation} />
                          <div className="invalid-feedback">
                            Please enter a valid Location.
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="omcomment" className="form-label">Enter any comment for mechanic</label>
                          <div className="input-group has-validation">
                            <textarea type="text" className="form-control" id="omcomment" name='eomcomment' onChange={handleOnChange} value={book.eomcomment} placeholder="Comment" required="" style={{ height: '100px' }}></textarea>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </form>
                  </div>
                </main>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal3">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Appointment</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="ammount" className="form-label">Enter any amount for mechanic</label>
                    <div className="input-group has-validation">
                      <input type="text" className="form-control" id="annount" name='eammount' onChange={handleOnChange} value={book.eammount} placeholder="ammount" required="" style={{ height: '100px' }}/>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="omcomment" className="form-label">Enter any comment for mechanic</label>
                    <div className="input-group has-validation">
                      <textarea type="text" className="form-control" id="omcomment" name='eomcomment' onChange={handleOnChange} value={book.eomcomment} placeholder="Comment" required="" style={{ height: '100px' }}></textarea>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
