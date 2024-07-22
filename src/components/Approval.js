import React, { useCallback, useMemo, useRef, useState } from 'react'
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

function DraggableMarker({setLocation, location}) {
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


export default function Approval() {
    const [approval, setApproval] = useState({ id: '', mName: '', mEmail: '', mContactNo: '', mAddress: '', mCountry: '', mState: '', mPincode: '', mType: '', mGarageName: '', mGarageEmail: '', mGarageContactNo: '', mGarageAddress: '', mLocation: '' })
    const ref = useRef();
    const refClose = useRef();
    const [location, setLocation] = useState({lat: '51.505', lng: '-0.09',})
    const [radio, setRadio] = useState(1);

    const handleOnChange = (e) => {
        setApproval({ ...approval, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('approval.mLocation');
        const response = await fetch('http://127.0.0.1:5000/api/mechanic/createmechanic', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ mName: approval.mName, mEmail: approval.mEmail, mContactNo: approval.mContactNo, mAddress: approval.mAddress, mCountry: approval.mCountry, mState: approval.mState, mPincode: approval.mPincode, mType: approval.mType, mGarageName: approval.mGarageName, mGarageEmail: approval.mGarageEmail, mGarageContactNo: approval.mGarageContactNo, mGarageAddress: approval.mGarageAddress, mLocation: approval.mLocation })
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

    const handleClearLocation = () => {
        setApproval({
            mLocation: ''
        });
    }

    const handleLocation = () => {
        ref.current.click();
    }

    const handleSubmitLocation = () => {
        console.log(location)
        refClose.current.click()
        setApproval({
            mLocation: location
        })
    }

    const handleRadio = ()=>{
        setRadio(document.getElementsByName('flexRadioDefault').value)
        console.log(radio);
    }

    return (
        <>
        <div className='container'>
            <main>
                <div className="py-5 text-center">
                    <h2>Manager Approval</h2>
                </div>
                <hr className="mb-4" />
                <div className="container">
                    <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                        <h3 className="mb-3">Fill Manager Details</h3>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="mname" className="form-label">Full Name</label>
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control" id="mname" placeholder="Lastname    Firstname    Middlename" required="" name='mName' onChange={handleOnChange} value={approval.mName} />
                                    <div className="invalid-feedback">
                                        Your fullname is required.
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="memail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="memail" placeholder="you@example.com" name='mEmail' onChange={handleOnChange} value={approval.mEmail} />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="mcontact" className="form-label">Contact No.</label>
                                <input type="text" className="form-control" id="mcontact" placeholder="1234567890" name='mContactNo' onChange={handleOnChange} value={approval.mContactNo} />
                                <div className="invalid-feedback">
                                    Please enter a valid mobile no. for shipping updates.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="maddress" className="form-label">Residental Address</label>
                                <input type="text" className="form-control" id="maddress" placeholder="1234 Main St" required="" name='mAddress' onChange={handleOnChange} value={approval.mAddress} />
                                <div className="invalid-feedback">
                                    Please enter your Residental address.
                                </div>
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="mcountry" className="form-label">Country</label>
                                <select className="form-select" id="mcountry" required="" name='mCountry' onChange={handleOnChange} value={approval.mCountry}>
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
                                <select className="form-select" id="mstate" required="" name='mState' onChange={handleOnChange} value={approval.mState}>
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
                                <input type="text" className="form-control" id="mzip" placeholder="" required="" name='mPincode' onChange={handleOnChange} value={approval.mPincode} />
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
                                <select className="form-select" id="mtype" required="" name='mType' onChange={handleOnChange} value={approval.mType}>
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
                                    <input type="text" className="form-control" id="mgname" placeholder="Name" required="" name='mGarageName' onChange={handleOnChange} value={approval.mGarageName} />
                                    <div className="invalid-feedback">
                                        Your vehiclename is required.
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="mgemail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="mgemail" placeholder="Email" name='mGarageEmail' onChange={handleOnChange} value={approval.mGarageEmail} />
                                <div className="invalid-feedback">
                                    Please enter a valid email.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="mgcontact" className="form-label">Contact No.</label>
                                <input type="text" className="form-control" id="mgcontact" placeholder="Contact No." name='mGarageContactNo' onChange={handleOnChange} value={approval.mGarageContactNo} />
                                <div className="invalid-feedback">
                                    Please enter a valid company.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="mgaddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="mgaddress" placeholder="Address" name='mGarageAddress' onChange={handleOnChange} value={approval.mGarageAddress} />
                                <div className="invalid-feedback">
                                    Please enter a valid address.
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <label htmlFor="mlocation" className="form-label">Location</label>
                                <input type="text" className="form-control" id="mlocation" placeholder="Enter location of garage" name='vPickLocation' onChange={handleOnChange} value={approval.vPickLocation} />
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
            </main>
        </div>


        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Select Location</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="">
                    <div className="form-check">
                        <input className="mx-2" type="radio" name="flexRadioDefault" id="yourLocation" value={1} onChange={handleRadio} />
                        <label className="mx-1" htmlFor="yourLocation">
                            Your Location
                        </label>
                    </div>
                    <div className="">
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
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmitLocation}>Submit Location</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
