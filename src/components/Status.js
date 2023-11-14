import React, { useContext, useEffect, useRef, useState } from 'react'
import statusContext from '../context/status/statusContext'
import StatusItem from './StatusItem';
import { useCallback, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import './Book.css'

function LocationMarker({ location, setLocation }) {
  const [position, setPosition] = useState(location)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      setLocation(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function DraggableMarker({ setLocation, location }) {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(location)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          setLocation(marker.getLatLng())
        }
      },
    }),
    [],
    // eslint-disable-next-line
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}


export default function Status() {
  const [approval, setApproval] = useState({ eid: '', emName: '', emEmail: '', emContactNo: '', emAddress: '', emCountry: '', emState: '', emPincode: '', emType: '', emGarageName: '', emGarageEmail: '', emGarageContactNo: '', emGarageAddress: '', emLocation: '' })
  const context = useContext(statusContext);
  const ref = useRef(null)
  const refClose = useRef(null)
  const refView = useRef(null)
  const refLocation = useRef(approval.emLocation)
  const refClose2 = useRef(null)
  const { approvals, getApprovals, updateApproval } = context;

  const handleRadio = () => {
    setRadio(document.getElementsByName('flexRadioDefault').value)
    console.log(radio);
  }

  const [location, setLocation] = useState(null)
  const [radio, setRadio] = useState(1);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getApprovals();
    }
    // eslint-disable-next-line
  }, [])

  const updateApprovals = (currentAppoint) => {
    ref.current.click();
    setApproval({ eid: currentAppoint._id, emName: currentAppoint.mName, emEmail: currentAppoint.mEmail, emContactNo: currentAppoint.mContactNo, emAddress: currentAppoint.mAddress, emCountry: currentAppoint.mCountry, emState: currentAppoint.mState, emPincode: currentAppoint.mPincode, emType: currentAppoint.mType, emGarageName: currentAppoint.emGarageName, emGarageEmail: currentAppoint.emGarageEmail, emGarageContactNo: currentAppoint.mGarageContactNo, emGarageAddress: currentAppoint.mGarageAddress, emLocation: currentAppoint.mLocation })
  }

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setApproval({ ...approval, [e.target.name]: e.target.value });
  }

  const handleClearLocation = () => {
    setApproval({
      emLocation: ''
    });
  }

  const handleLocation = () => {
    refLocation.current.click();
  }

  const handleSubmitLocation = () => {
    refClose2.current.click()
    setApproval({
      emLocation: location
    })
  }

  const viewApproval = (currentAppoint) => {
    refView.current.click();
    setApproval({ eid: currentAppoint._id, emName: currentAppoint.mName, emEmail: currentAppoint.mEmail, emContactNo: currentAppoint.mContactNo, emAddress: currentAppoint.mAddress, emCountry: currentAppoint.mCountry, emState: currentAppoint.mState, emPincode: currentAppoint.mPincode, emType: currentAppoint.mType, emGarageName: currentAppoint.mGarageName, emGarageEmail: currentAppoint.mGarageEmail, emGarageContactNo: currentAppoint.mGarageContactNo, emGarageAddress: currentAppoint.mGarageAddress, emLocation: currentAppoint.mLocation })
  }

  const handleUpdate = (e) => {
    console.log("Updating the current approval, new approval: ", approval);
    updateApproval(approval.eid, approval.emName, approval.emEmail, approval.emContactNo, approval.emAddress, approval.emCountry, approval.emState, approval.emPincode, approval.emType, approval.emGarageName, approval.emGarageEmail, approval.emGarageContactNo, approval.emGarageAddress, approval.emLocation)
    refClose.current.click();
  }

  return (
    <>
      {/* Modal */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Approval</h1>
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
                                <input type="text" className="form-control" id="maddress" placeholder="1234 Main St" required="" name='mAddress' onChange={handleOnChange} value={approval.emAddress} />
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
                            <div className="col-sm-7">
                                <label htmlFor="mlocation" className="form-label">Location</label>
                                <input type="text" className="form-control" id="mlocation" placeholder="Enter location of garage" name='emLocation' onChange={handleOnChange} value={approval.emLocation} />
                                <div className="invalid-feedback">
                                    Please enter a valid Location.
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <label htmlFor="mlocation" className="form-label">Location Operations:</label>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                                    <button type="button" className="btn btn-primary px-4 gap-3" onClick={handleLocation}>Add Location</button>
                                    <button type="button" className="btn btn-outline-secondary px-4" onClick={handleClearLocation}>Clear Location</button>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row g-3">
                            <div className="col-sm-5">
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                                    <button type="submit" className="btn btn-primary btn-lg px-4 gap-3">Submit</button>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                    </form>
                </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Approval</button>
            </div>
          </div>
        </div>
      </div>


      <div className='container'>
        <div className="py-5 text-center">
          <h2>Appointment</h2>
        </div>
        <hr className="mb-4" />
        <div className='container row my-3'>
          {
            !localStorage.getItem('token') ? <div className='container my-3'>Login to check appointments</div> :
              approvals.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                approvals.map((approval) => {
                  return <StatusItem key={approval._id} approval={approval} updateApprovals={updateApprovals} viewApproval={viewApproval} />
                })
          }
        </div>
      </div>


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


      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={refLocation} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal3">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Select Location</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="container">
              <div className="form-check">
                <input className="mx-2" type="radio" name="flexRadioDefault" id="yourLocation" value={1} onChange={handleRadio} />
                <label className="mx-1" htmlFor="yourLocation">
                  Your Location
                </label>
              </div>
              <div className="container">
                <input className="mx-2" type="radio" name="flexRadioDefault" id="chooseLocation" value={2} onChange={handleRadio} />
                <label className="mx-1" htmlFor="chooseLocation">
                  Choose Location
                </label>
              </div>
              <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {(radio === 1) ? <LocationMarker setLocation={setLocation} location={location} /> : <DraggableMarker setLocation={setLocation} location={location} />}
              </MapContainer>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose2} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitLocation}>Submit Location</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
