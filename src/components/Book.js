import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Book.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
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

export default function Book() {
    const [book, setBook] = useState({ vOwnerName: '', vOwnerEmail: '', vOwnerContactNo: '', vOwnerAddress: '', vOwnerCountry: '', vOwnerState: '', vOwnerPincode: '', vDriverName: '', vDriverEmail: '', vDriverContactNo: '', vType: '', vName: '', vCompany: '', vRegisteredNo: '', vPickLocation: '', omcomment: '' })
    const navigate = useNavigate();
    const ref = useRef();
    const refClose = useRef();
    const [location, setLocation] = useState({ lat: '51.505', lng: '-0.09', })
    const [btnradio, setBtnradio] = useState(1);

    const handleOnChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
        console.log(e.target.value)
    }
    const handleClearLocation = () => {
        setBook({
            vPickLocation: ''
        });
    }

    useEffect(() => {
        document.getElementById('btnradio1').checked = true
    }, [])
    

    const handleLocation = () => {
        ref.current.click();
    }

    const handleSubmitLocation = () => {
        refClose.current.click()
        setBook({
            vPickLocation: location
        })
    }

    const handleonRadioChange = (e) => {
        if (document.getElementById('btnradio1').checked === true) {
          setBtnradio(1)
        }
        if (document.getElementById('btnradio2').checked === true) {
          setBtnradio(2)
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(book)
        const response = await fetch('http://127.0.0.1:5000/api/appoint/createappoint', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ vOwnerName: book.vOwnerName, vOwnerEmail: book.vOwnerEmail, vOwnerContactNo: book.vOwnerContactNo, vOwnerAddress: book.vOwnerContactNo, vOwnerCountry: book.vOwnerCountry, vOwnerState: book.vOwnerState, vOwnerPincode: book.vOwnerPincode, vDriverName: book.vDriverName, vDriverEmail: book.vDriverEmail, vDriverContactNo: book.vDriverContactNo, vType: book.vType, vName: book.vName, vCompany: book.vCompany, vRegisteredNo: book.vRegisteredNo, vPickLocation: book.vPickLocation, omcomment: book.omcomment })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect to Home
            navigate('/');
        }
        else {
            alert(json.error);
        }
    }

    return (
        <>
            <div className='container'>
                <main>
                    <div className="py-5 text-center">
                        <h2>Book Appointment</h2>
                    </div>
                    <hr className="mb-4" />
                    <div className="container">
                        <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                            <h3 className="mb-3">Fill Owner Details</h3>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="oname" className="form-label">Full Name</label>
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" id="oname" placeholder="Lastname    Firstname    Middlename" required="" name='vOwnerName' onChange={handleOnChange} value={book.vOwnerName} />
                                        <div className="invalid-feedback">
                                            Your fullname is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="oemail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="oemail" placeholder="you@example.com" name='vOwnerEmail' onChange={handleOnChange} value={book.vOwnerEmail} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="ocontact" className="form-label">Contact No.</label>
                                    <input type="text" className="form-control" id="ocontact" placeholder="1234567890" name='vOwnerContactNo' onChange={handleOnChange} value={book.vOwnerContactNo} />
                                    <div className="invalid-feedback">
                                        Please enter a valid mobile no. for shipping updates.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="oaddress" className="form-label">Residental Address</label>
                                    <input type="text" className="form-control" id="oaddress" placeholder="1234 Main St" required="" name='vOwnerAddress' onChange={handleOnChange} value={book.vOwnerAddress} />
                                    <div className="invalid-feedback">
                                        Please enter your Residental address.
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="ocountry" className="form-label">Country</label>
                                    <select className="form-select" id="ocountry" required="" name='vOwnerCountry' onChange={handleOnChange} value={book.vOwnerCountry}>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                        <option>Indias</option>
                                        <option>United Kingdom</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="ostate" className="form-label">State</label>
                                    <select className="form-select" id="ostate" required="" name='vOwnerState' onChange={handleOnChange} value={book.vOwnerState}>
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
                                    <label htmlFor="ozip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="ozip" placeholder="" required="" name='vOwnerPincode' onChange={handleOnChange} value={book.vOwnerPincode} />
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
                                        <input type="text" className="form-control" id="dname" placeholder="Lastname    Firstname    Middlename" required="" name='vDriverName' onChange={handleOnChange} value={book.vDriverName} />
                                        <div className="invalid-feedback">
                                            Your fullname is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="demail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="demail" placeholder="you@example.com" name='vDriverEmail' onChange={handleOnChange} value={book.vDriverEmail} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="dcontact" className="form-label">Contact No.</label>
                                    <input type="text" className="form-control" id="dcontact" placeholder="1234567890" name='vDriverContactNo' onChange={handleOnChange} value={book.vDriverContactNo} />
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
                                    <select className="form-select" id="vtype" required="" name='vType' onChange={handleOnChange} value={book.vType}>
                                        <option value="">Choose...</option>
                                        <option>Car</option>
                                        <option>Bike</option>
                                        <option>Truck</option>
                                        <option>Tempo</option>
                                        <option>Scooter</option>
                                        <option>Bus</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid type.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="vname" className="form-label">Name</label>
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" id="vname" placeholder="Ertiga" required="" name='vName' onChange={handleOnChange} value={book.vName} />
                                        <div className="invalid-feedback">
                                            Your vehiclename is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="vcompany" className="form-label">Brand</label>
                                    <input type="text" className="form-control" id="vcompany" placeholder="Maharuti Suzuki" name='vCompany' onChange={handleOnChange} value={book.vCompany} />
                                    <div className="invalid-feedback">
                                        Please enter a valid company.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="vregistration" className="form-label">Registeration No</label>
                                    <input type="text" className="form-control" id="vregistration" placeholder="AB: 01 XY: 1234" name='vRegisteredNo' onChange={handleOnChange} value={book.vRegisteredNo} />
                                    <div className="invalid-feedback">
                                        Please enter a valid registeration no.
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <label htmlFor="vlocation" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="vlocation" placeholder="Enter location of vehicle" name='vPickLocation' onChange={handleOnChange} value={book.vPickLocation} />
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
                                        <textarea type="text" className="form-control" id="omcomment" name='omcomment' onChange={handleOnChange} value={book.omcomment} placeholder="Comment" required="" style={{ height: '100px' }}></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                                        <button type="submit" className="btn btn-primary btn-lg px-4 gap-3">Book Appointment</button>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                        </form>
                    </div>
                </main>
            </div>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Select Location</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container mb-4">
                            <div className="btn-group col-12" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onChange={handleonRadioChange} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Your Location</label>

                                <input type="radio" className="btn-check mb-3" name="btnradio" id="btnradio2" onChange={handleonRadioChange} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">Choose Location</label>
                            </div>

                            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
                                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {(btnradio === 1) ? <LocationMarker setLocation={setLocation} location={location} /> : <DraggableMarker setLocation={setLocation} location={location} />}
                            </MapContainer>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitLocation}>Submit Location</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
