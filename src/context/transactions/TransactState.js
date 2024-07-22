import React, { useState } from 'react'
import transactContext from './transactContext'

const TransactState = (props) => {
    const [transact, setTransact] = useState({ownerName: '', payeeName: '', payeeEmail: '', payeeContactNo: '', payeeAddress: '', payeeCountry: "", payeeState: '', payeePincode: '', appoint: '', mechanic: '', t_cost: '', t_status: '', vType: '', vRegistrationNo: '', vName: '', vLocation: '', vProblem: '', mechanicName: '', mechanicContact: '', mechanicEmail: '', garageName: '', garageContact: ''})
    const getAppointDetails = async ()=>{
        const response = await fetch(`http://127.0.0.1:5000/api/mechanic/getmechanicdetails/${transact.mechanic}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        const mechanic = json[0];
        console.log(mechanic)
        setTimeout(() => {
            setTransact({ownerName: transact.ownerName, t_cost: transact.t_cost, appoint: transact.appoint, vType: transact.vType, vName: transact.vName, vRegistrationNo: transact.vRegistrationNo, vLocation: transact.vLocation, vProblem: transact.vProblem, mechanic: transact.mechanic, mechanicName: mechanic.mName, mechanicEmail: mechanic.mEmail, mechanicContact: mechanic.mContactNo, garageName: mechanic.mGarageName, garageContact: mechanic.mGarageContactNo})
        }, 2000);
        
    }
    return (
        <transactContext.Provider value={{transact, setTransact, getAppointDetails}}>
            {props.children}
        </transactContext.Provider>
    )
}

export default TransactState