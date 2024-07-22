import React, { useContext, useEffect } from 'react'
import logo from './images/logo512.svg'
import transactContext from '../context/transactions/transactContext';
import { useNavigate } from 'react-router-dom';

export default function Transaction() {
    const context = useContext(transactContext);
    const { transact, setTransact, getAppointDetails } = context

    useEffect(() => {
        getAppointDetails();
        // eslint-disable-next-line
    }, []);
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setTransact({ ...transact, [e.target.name]: e.target.value })
    }

    const verifySignature = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
        const response3 = await fetch('http://127.0.0.1:5000/api/checkout/verification', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ razorpay_order_id: razorpay_order_id, razorpay_payment_id: razorpay_payment_id, razorpay_signature: razorpay_signature })
        })
        const json = await response3.json();
        if (json.success) {
            document.getElementById('cost').style.backgroundColor = 'green'
            alert("Payment Successful");
            initiatePayment2();
        }
        else {
            document.getElementById('cost').style.backgroundColor = 'red'
            alert("Some Error Occured");
        }
    }

    const initiatePayment1 = async () => {
        if (transact.payeeName === '' || transact.payeeEmail === '' || transact.payeeContactNo === '' || transact.payeeAddress === '' || transact.payeeCountry === '' || transact.payeeState === '' || transact.payeePincode === '') {
            alert("Fill al the fie;ds to checkout");
        } else {
            const response1 = await fetch('http://127.0.0.1:5000/api/checkout/getkey', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json1 = await response1.json();
            const key = json1.key;
            const response2 = await fetch('http://127.0.0.1:5000/api/checkout/payment', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ amount: transact.t_cost })
            })
            const json2 = await response2.json();
            const order = json2.order;
            console.log({ key, order })
            const options = {
                key,
                amount: transact.t_cost,
                currency: "INR",
                name: transact.payeeName,
                description: "Razorpay Integration",
                // image: "E:/TE Project/SE Project/vehiclebreakdownsystem/public/logo512.png",
                order_id: order.id,
                // callback_url: "http://127.0.0.1:5000/api/checkout/verification",
                "handler": function async(response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    verifySignature(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature)
                },
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
            razorpay.on('payment.failed', function (response) {
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                document.getElementById('cost').style.backgroundColor = 'red'
                alert("Payment Not Successful");
            });
        }
    }

    const initiatePayment2 = async () => {
        console.log(transact);
        const response = await fetch('http://127.0.0.1:5000/api/transaction/createtransact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ payeeName: transact.payeeName, payeeEmail: transact.payeeEmail, payeeContactNo: transact.payeeContactNo, payeeAddress: transact.payeeAddress, payeeCountry: transact.payeeCountry, payeeState: transact.payeeState, payeePincode: transact.payyePincode, t_cost: transact.t_cost, t_status: 'done', appointID: transact.appoint, mechanicID: transact.mechanic })
        })
        const json = await response.json();
        console.log(json.savedTransact);
        const response1 = await fetch(`http://127.0.0.1:5000/api/appoint/updateappoint/${transact.appoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ t_status: 'done' })
        })
        const json1 = await response1.json();
        console.log(json1)
        navigate('/')
    }
    return (
        <div className="container">
            <main>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-3" src={logo} alt="" width="100" height="100" />
                    <h2>Checkout form</h2>
                </div>

                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your Vehicle Details</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Vehicle Type</h6>
                                    <small className="text-body-secondary" name="vType" onChange={handleOnChange}>{transact.vType}</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Vehicle Name</h6>
                                    <small className="text-body-secondary" name='vName' onChange={handleOnChange}>{transact.vName}</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Vehicle Registration No.</h6>
                                    <small className="text-body-secondary" name='vNvRegistrationNoame' onChange={handleOnChange}>{transact.vRegistrationNo}</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Vehicle Location</h6>
                                    <small className="text-body-secondary" name='vLocation' onChange={handleOnChange}>{transact.vLocation.lat} {transact.vLocation.lng}</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Problems</h6>
                                    <small className="text-body-secondary" name='vProblem' onChange={handleOnChange}>{transact.vProblem}</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                            </li>
                            <li id='cost' className="list-group-item d-flex justify-content-between bg-primary fs-4">
                                <span>Total (INR)</span>
                                <strong>&#8377; {transact.t_cost}</strong>
                            </li>
                        </ul>

                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Check Details</h4>
                        <form className="needs-validation" noValidate="">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Vehicle Owner Full Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First Middle Last" name='ownerName' onChange={handleOnChange} value={transact.ownerName} required="" />
                                    <div className="invalid-feedback">
                                        Valid full name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Payee Name</label>
                                    <input type="text" className="form-control" id="lastName" name='payeeName' onChange={handleOnChange} placeholder="First Middle Last" value={transact.payeeName} required="" />
                                    <div className="invalid-feedback">
                                        Valid full name is required.
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">Payee Email <span className="text-body-secondary"></span></label>
                                    <input type="email" className="form-control" id="email" name='payeeEmail' onChange={handleOnChange} placeholder="you@example.com" value={transact.payeeEmail} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="text" className="form-label">Payee Contact No. <span className="text-body-secondary"></span></label>
                                    <input type="text" className="form-control" id="text" placeholder="123456789" name='payeeContactNo' onChange={handleOnChange} value={transact.payeeContactNo} />
                                    <div className="invalid-feedback">
                                        Please enter a valid contact no. for shipping updates.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Payee Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" name='payeeAddress' onChange={handleOnChange} value={transact.payeeAddress} required="" />
                                    <div className="invalid-feedback">
                                        Please enter payee shipping address.
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select" id="country" required="" name='payeeCountry' onChange={handleOnChange} value={transact.payeeCountry}>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-select" id="state" required="" name='payeeState' onChange={handleOnChange} value={transact.payeeState}>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="123456" name='payyePincode' onChange={handleOnChange} required="" value={transact.payyePincode} />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Mechanic Full Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First Middle Last" name='mechanicName' onChange={handleOnChange} value={transact?.mechanicName} required="" />
                                    <div className="invalid-feedback">
                                        Valid full name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Mechanic Contact No.</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="1234567890" name='mechanicContact' onChange={handleOnChange} value={transact?.mechanicContact} required="" />
                                    <div className="invalid-feedback">
                                        Valid contact no. is required.
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="lastName" className="form-label">Mechanic Email</label>
                                    <input type="email" className="form-control" id="lastName" placeholder="your@example.com" name='mechanicEmail' onChange={handleOnChange} value={transact?.mechanicEmail} required="" />
                                    <div className="invalid-feedback">
                                        Valid full name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Garage Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="Garage Name" name='GarageName' onChange={handleOnChange} value={transact?.garageName} required="" />
                                    <div className="invalid-feedback">
                                        Valid full name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Garage Contact No.</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="1234567890" name='GarageContact' onChange={handleOnChange} value={transact?.garageContact} required="" />
                                    <div className="invalid-feedback">
                                        Valid contact no. is required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg mb-4" type="button" onClick={initiatePayment1}>Continue to checkout</button>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
