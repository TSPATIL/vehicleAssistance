import { useState } from "react";
import statusContext from "./statusContext";

const StatusState = (props) => {
    const host = 'http://127.0.0.1:5000';
    const statusInitial = [];
    const [approvals, setApprovals] = useState(statusInitial);

    //Get all appointments
    const getApprovals = async () => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/fetchallnonapprovedmechanics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setApprovals(json);
    }

    //Delete an appointment
    const deleteApproval = async (id) => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/deletemechanic/${id}`, {
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
            const newApprovals = approvals.filter((approval) => { return approval._id !== id })
            setApprovals(newApprovals)
        }
        else {
            alert(json.error);
        }

    }
    //Update an appointment
    const updateApproval = async (id, mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status) => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/updatemechanic/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status})
        });
        const json = await response.json();
        console.log(json);
        let newApproval = JSON.parse(JSON.stringify(json.updateMechanic))
        console.log(newApproval)
        if (json.success) {
            //Logic to edit in client
            for (let index = 0; index < approvals.length; index++) {
                const element = approvals[index];
                if (element._id === id) {
                    approvals[index].mName = mName;
                    approvals[index].mEmail = mEmail;
                    approvals[index].mContactNo = mContactNo;
                    approvals[index].mAddress = mAddress;
                    approvals[index].mCountry = mCountry;
                    approvals[index].mState = mState;
                    approvals[index].mPincode = mPincode;
                    approvals[index].mType = mType;
                    approvals[index].mGarageName = mGarageName;
                    approvals[index].mGarageEmail = mGarageEmail;
                    approvals[index].mGarageContactNo = mGarageContactNo;
                    approvals[index].mGarageAddress = mGarageAddress;
                    approvals[index].mLocation = mLocation;
                    approvals[index].m_status = m_status;
                    break;
                }
            }
            setApprovals(newApproval)
            console.log(approvals);
        }
        else {
            alert(json.error);
        }

    }

    //Get not approved and not rejected approvals
    const getNApprovedApprovals = async () => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/fetchallnonapprovedmechanics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setApprovals(json);
        console.log(json)
    }

    //Get rejected approvals
    const getRejectedApprovals = async () => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/fetchallrejectedmechanics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setApprovals(json);
        console.log(json);
    }
    //Get approved approvals
    const getApprovedApprovals = async () => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/fetchallapprovedmechanics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setApprovals(json);
    }

    //Update an appointment
    const updateApprovalstatus = async (id, mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status) => {
        //API CALL
        const response = await fetch(`${host}/api/mechanic/updatemechanicstatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status})
        });
        const json = await response.json();
        console.log(json);
        let newApproval = JSON.parse(JSON.stringify(json.updateMechanic))
        console.log(newApproval)
        if (json.success) {
            //Logic to edit in client
            for (let index = 0; index < approvals.length; index++) {
                const element = approvals[index];
                if (element._id === id) {
                    approvals[index].mName = mName;
                    approvals[index].mEmail = mEmail;
                    approvals[index].mContactNo = mContactNo;
                    approvals[index].mAddress = mAddress;
                    approvals[index].mCountry = mCountry;
                    approvals[index].mState = mState;
                    approvals[index].mPincode = mPincode;
                    approvals[index].mType = mType;
                    approvals[index].mGarageName = mGarageName;
                    approvals[index].mGarageEmail = mGarageEmail;
                    approvals[index].mGarageContactNo = mGarageContactNo;
                    approvals[index].mGarageAddress = mGarageAddress;
                    approvals[index].mLocation = mLocation;
                    approvals[index].m_status = m_status;
                    break;
                }
            }
            setApprovals(newApproval)
            console.log(approvals);
        }
        else {
            alert(json.error);
        }

    }

    return (
        <statusContext.Provider value={{ approvals, getApprovals, deleteApproval, updateApproval, getNApprovedApprovals, getRejectedApprovals, getApprovedApprovals, updateApprovalstatus }}>
            {props.children}
        </statusContext.Provider>
    )
}

export default StatusState;