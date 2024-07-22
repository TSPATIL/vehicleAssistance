import React, { useContext, useEffect, useRef, useState } from 'react'
import appointContext from '../context/appointments/appointContext'
import EditAppointment from './EditAppointment';
import { useCallback, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import './Book.css'
import StatusAppointment from './StatusAppointment';
import CompletedAppointment from './CompletedAppointment';
import { useNavigate } from 'react-router-dom';
import transactContext from '../context/transactions/transactContext';

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


export default function Appointment() {
  const [book, setBook] = useState({ eid: '', evOwnerName: '', evOwnerEmail: '', evOwnerContactNo: '', evOwnerAddress: '', evOwnerCountry: '', evOwnerState: '', evOwnerPincode: '', evDriverName: '', evDriverEmail: '', evDriverContactNo: '', evType: '', evName: '', evCompany: '', evRegisteredNo: '', evPickLocation: '', eomcomment: '' })
  const context = useContext(appointContext);
  const context1 = useContext(transactContext);
  const ref = useRef(null)
  const refClose = useRef(null)
  const refView = useRef(null)
  const refLocation = useRef(null)
  const refClose2 = useRef(null)
  const { appoints, getNAcceptedUserAppoints, updateAppoint, getAcceptedInUserAppoints, getAcceptedComUserAppoints } = context;
  const { setTransact, getAppointDetails } = context1;

  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNAcceptedUserAppoints();
    }
    document.getElementById('btnradio1').checked = true
    document.getElementById('btnradioloc1').checked = true
    // eslint-disable-next-line
  }, [])

  const updateAppoints = (currentAppoint) => {
    ref.current.click();
    setBook({ eid: currentAppoint._id, evOwnerName: currentAppoint.vOwnerName, evOwnerEmail: currentAppoint.vOwnerEmail, evOwnerContactNo: currentAppoint.vOwnerContactNo, evOwnerAddress: currentAppoint.vOwnerAddress, evOwnerCountry: currentAppoint.vOwnerCountry, evOwnerState: currentAppoint.vOwnerState, evOwnerPincode: currentAppoint.vOwnerPincode, evDriverName: currentAppoint.vDriverName, evDriverEmail: currentAppoint.vDriverEmail, evDriverContactNo: currentAppoint.vDriverContactNo, evType: currentAppoint.vType, evName: currentAppoint.vName, evCompany: currentAppoint.vCompany, evRegisteredNo: currentAppoint.vRegisteredNo, evPickLocation: currentAppoint.vPickLocation, eomcomment: currentAppoint.omcomment })
  }

  const handleOnChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  const handleClearLocation = () => {
    setBook({
      evPickLocation: ''
    });
  }

  const handleLocation = () => {
    refLocation.current.click();
  }

  const handleSubmitLocation = () => {
    refLocation.current.click()
    setBook({
      vPickLocation: location
    })
  }

  const viewAppoint = (currentAppoint) => {
    refView.current.click();
    setBook({ eid: currentAppoint._id, evOwnerName: currentAppoint.vOwnerName, evOwnerEmail: currentAppoint.vOwnerEmail, evOwnerContactNo: currentAppoint.vOwnerContactNo, evOwnerAddress: currentAppoint.vOwnerAddress, evOwnerCountry: currentAppoint.vOwnerCountry, evOwnerState: currentAppoint.vOwnerState, evOwnerPincode: currentAppoint.vOwnerPincode, evDriverName: currentAppoint.vDriverName, evDriverEmail: currentAppoint.vDriverEmail, evDriverContactNo: currentAppoint.vDriverContactNo, evType: currentAppoint.vType, evName: currentAppoint.vName, evCompany: currentAppoint.vCompany, evRegisteredNo: currentAppoint.vRegisteredNo, evPickLocation: currentAppoint.vPickLocation, eomcomment: currentAppoint.omcomment })
  }

  const handleUpdate = (e) => {
    console.log("Updating the current note, new note: ", book);
    updateAppoint(book.eid, book.evOwnerName, book.evOwnerEmail, book.evOwnerContactNo, book.evOwnerAddress, book.evOwnerCountry, book.evOwnerState, book.evOwnerPincode, book.evDriverName, book.evDriverEmail, book.evDriverContactNo, book.evType, book.evName, book.evCompany, book.evRegisteredNo, book.evPickLocation, book.eomcomment)
    refClose.current.click();
  }

  const [btnradio, setBtnradio] = useState(1);
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

  const handleAcceptAppoint = () => {
    getNAcceptedUserAppoints();
  }

  const handleCompleteAppoint = () => {
    getAcceptedComUserAppoints();
  }

  const handleSubmitAppoint = () => {
    getAcceptedInUserAppoints();
  }

  const [btnradioloc, setBtnradioLoc] = useState(1);
  const handleonRadioLocChange = (e) => {
    if (document.getElementById('btnradioloc1').checked === true) {
      setBtnradioLoc(1)
    }
    if (document.getElementById('btnradioloc2').checked === true) {
      setBtnradioLoc(2)
    }
  }

  const navigate = useNavigate();
  const transactAppoint = (currentAppoint)=>{
    console.log(currentAppoint.mechanic)
    setTransact({ownerName: currentAppoint.vOwnerName, t_cost: currentAppoint.t_cost, appoint: currentAppoint._id, vType:currentAppoint.vType, vName:currentAppoint.vName, vRegistrationNo: currentAppoint.vRegisteredNo, vLocation:currentAppoint.vPickLocation, vProblem:currentAppoint.omcomment, mechanic:currentAppoint.mechanic});
    navigate('/transactions');
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
          <label className="btn btn-outline-primary" htmlFor="btnradio1">Under Acceptance</label>

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
                    appoints && appoints.map((appoint) => {
                      return <EditAppointment key={appoint._id} appoint={appoint} updateAppoints={updateAppoints} viewAppoint={viewAppoint} />
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
                  appoints && appoints.map((appoint) => {
                      return <StatusAppointment key={appoint._id} appoint={appoint} viewAppoint={viewAppoint} />
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
                  appoints && appoints.map((appoint) => {
                      return <CompletedAppointment key={appoint._id} appoint={appoint} viewAppoint={viewAppoint} transactAppoint={transactAppoint} />
                    })
              }
            </div> :
            null
        }
      </div>







      {/* Modal */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Appointment</h1>
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
                            <option value={'Car'}>Car</option>
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
                        <div className="col-sm-7">
                          <label htmlFor="vlocation" className="form-label">Location</label>
                          <input type="text" className="form-control" id="vlocation" placeholder="Enter location of vehicle" name='evPickLocation' onChange={handleOnChange} value={book.evPickLocation} />
                          <div className="invalid-feedback">
                            Please enter a valid Location.
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <label htmlFor="vlocation" className="form-label">Location Operations:</label>
                          <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                            <button type="button" className="btn btn-primary px-4 gap-3" onClick={handleLocation}>Add Location</button>
                            <button type="button" className="btn btn-outline-secondary px-4" onClick={handleClearLocation}>Clear Location</button>
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
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Appointment</button>
            </div>
          </div>
        </div>
      </div>


      {/* <div className='container'>
        <div className="py-5 text-center">
          <h2>Appointment</h2>
        </div>
        <hr className="mb-4" />
        <div className='container row my-3'>
          {
            !localStorage.getItem('token') ? <div className='container my-3'>Login to check appointments</div> :
              appoints.length === 0 ? <div className='container my-3'>No appointments to display</div> :
                appoints.map((appoint) => {
                  return <AppointItem key={appoint._id} appoint={appoint} updateAppoints={updateAppoints} viewAppoint={viewAppoint} />
                })
          }
        </div>
      </div> */}


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
                            <option value={'Car'}>Car</option>
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
            <div className="modal-body">
              <div className="container">
                <div className="btn-group col-12" aria-label="Basic radio toggle button group">
                  <input type="radio" className="btn-check" name="btnradio" id="btnradioloc1" onChange={handleonRadioLocChange} />
                  <label className="btn btn-outline-primary" htmlFor="btnradioloc1">Your Location</label>

                  <input type="radio" className="btn-check mb-3" name="btnradio" id="btnradioloc2" onChange={handleonRadioLocChange} />
                  <label className="btn btn-outline-primary" htmlFor="btnradioloc2">Choose Location</label>
                </div>
                <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {(btnradioloc === 1) ? <LocationMarker setLocation={setLocation} location={location} /> : <DraggableMarker setLocation={setLocation} location={location} />}
                </MapContainer>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose2} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmitLocation}>Submit Location</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
