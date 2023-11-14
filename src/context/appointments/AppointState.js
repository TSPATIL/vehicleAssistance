import { useState } from "react";
import appointContext from "./appointContext";

const AppointState = (props) => {
    const host = 'http://127.0.0.1:5000';
    const appointsInitial = [];
    const [appoints, setAppoints] = useState(appointsInitial);

    //Get all appointments
    const getAppoints = async () => {
        //API CALL
        const response = await fetch(`${host}/api/appoint/fetchallappoints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAppoints(json);
    }

    //Delete an appointment
    const deleteAppoint = async (id) => {
        //API CALL
        const response = await fetch(`${host}/api/appoint/deleteappoint/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        if (json.success) {
            //Logic of delete in client
            console.log("Deleting the appointment with id: " + id);
            const newAppoints = appoints.filter((appoint) => { return appoint._id !== id })
            setAppoints(newAppoints)
        }
        else {
            alert(json.error);
        }
    }
    //Update an appointment
    const updateAppoint = async (id, vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status) => {
        //API CALL
        console.log(id)
        const response = await fetch(`${host}/api/appoint/updateappoint/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status})
        });
        const json = await response.json();
        console.log(json);
        let newAppoint = await JSON.parse(JSON.stringify(json.updateAppoint))
        console.log(newAppoint)
        if (json.success) {
            //Logic to edit in client
            for (let index = 0; index < appoints.length; index++) {
                const element = appoints[index];
                if (element._id === id) {
                    appoints[index].vOwnerName = vOwnerName;
                    appoints[index].vOwnerEmail = vOwnerEmail;
                    appoints[index].vOwnerContactNo = vOwnerContactNo;
                    appoints[index].vOwnerAddress = vOwnerAddress;
                    appoints[index].vOwnerCountry = vOwnerCountry;
                    appoints[index].vOwnerState = vOwnerState;
                    appoints[index].vOwnerPincode = vOwnerPincode;
                    appoints[index].vDriverName = vDriverName;
                    appoints[index].vDriverEmail = vDriverEmail;
                    appoints[index].vDriverContactNo = vDriverContactNo;
                    appoints[index].vType = vType;
                    appoints[index].VnvName =vName;
                    appoints[index].vCompany = vCompany;
                    appoints[index].vRegisteredNo = vRegisteredNo;
                    appoints[index].vPickLocation = vPickLocation;
                    appoints[index].omcomment = omcomment;
                    appoints[index].a_status = a_status;
                    break;
                }
            }
            setAppoints(newAppoint)
            console.log(appoints);
        }
        else {
            alert(json.error);
        }

    }

    //get not accepted appoints
    const getNAcceptedAppoints = async ()=>{
         //API CALL
         const response = await fetch(`${host}/api/appoint/fetchallnaccptedAppoints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAppoints(json);
    }

    //get accepted inprocess appoints
    const getAcceptedInAppoints = async ()=>{
         //API CALL
         const response = await fetch(`${host}/api/appoint/fetchallnaccptedinAppoints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAppoints(json);
    }

    //get accepted completed appoints
    const getAcceptedComAppoints = async ()=>{
         //API CALL
         const response = await fetch(`${host}/api/appoint/fetchallnaccptedcomAppoints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAppoints(json);
    }

    //Update an appointment status
    const updateAppointStatus = async (id, vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status, t_cost) => {
        //API CALL
        console.log(id)
        const response = await fetch(`${host}/api/appoint/updateappointstatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status, t_cost})
        });
        const json = await response.json();
        console.log(json);
        let newAppoint = await JSON.parse(JSON.stringify(json.updateAppoint))
        console.log(newAppoint)
        if (json.success) {
            //Logic to edit in client
            for (let index = 0; index < appoints.length; index++) {
                const element = appoints[index];
                if (element._id === id) {
                    appoints[index].vOwnerName = vOwnerName;
                    appoints[index].vOwnerEmail = vOwnerEmail;
                    appoints[index].vOwnerContactNo = vOwnerContactNo;
                    appoints[index].vOwnerAddress = vOwnerAddress;
                    appoints[index].vOwnerCountry = vOwnerCountry;
                    appoints[index].vOwnerState = vOwnerState;
                    appoints[index].vOwnerPincode = vOwnerPincode;
                    appoints[index].vDriverName = vDriverName;
                    appoints[index].vDriverEmail = vDriverEmail;
                    appoints[index].vDriverContactNo = vDriverContactNo;
                    appoints[index].vType = vType;
                    appoints[index].VnvName =vName;
                    appoints[index].vCompany = vCompany;
                    appoints[index].vRegisteredNo = vRegisteredNo;
                    appoints[index].vPickLocation = vPickLocation;
                    appoints[index].omcomment = omcomment;
                    appoints[index].a_status = a_status;
                    appoints[index].t_cost = t_cost;
                    break;
                }
            }
            setAppoints(newAppoint)
            console.log(appoints);
        }
        else {
            alert(json.error);
        }

    }

    //get not accepted appoints in user
    const getNAcceptedUserAppoints = async ()=>{
        //API CALL
        const response = await fetch(`${host}/api/appoint/fetchallnaccpteduserAppoints`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
           }
       });
       const json = await response.json();
       setAppoints(json);
   }

    //get not accepted appoints
    const getAcceptedInUserAppoints = async ()=>{
        //API CALL
        const response = await fetch(`${host}/api/appoint/fetchallaccpteduserinAppoints`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
           }
       });
       const json = await response.json();
       setAppoints(json);
   }

   //get accepted inprocess appoints
   const getAcceptedComUserAppoints = async ()=>{
        //API CALL
        const response = await fetch(`${host}/api/appoint/fetchallaccptedusercomAppoints`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
           }
       });
       const json = await response.json();
       setAppoints(json);
   }

    return (
        <appointContext.Provider value={{ appoints, getAppoints, deleteAppoint, updateAppoint, getNAcceptedAppoints, updateAppointStatus, getAcceptedInAppoints, getAcceptedComAppoints, getNAcceptedUserAppoints, getAcceptedInUserAppoints, getAcceptedComUserAppoints }}>
            {props.children}
        </appointContext.Provider>
    )
}

export default AppointState;