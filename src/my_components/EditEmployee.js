import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

export const EditEmployee = () => {
  let tableBox = {
    minHeight: "80vh"
  }

  let history = useNavigate();
  const {id} = useParams();

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[designation, setDesignation] = useState("");
  const[employeeNumber, setEmployeeNumber] = useState("");
  const[payBand, setPayBand] = useState("");
  const[address, setAddress] = useState("");
  const[pincode, setPincode] = useState("");
  const[contractor, setContractor] = useState("");

  const url = "http://localhost:8080/";

  const getEmployeeById = (id) => {
    axios.get(`${url}spring/employee/${id}`).then((jsonResponse) => {
      setFirstName(jsonResponse.data.firstName);
      setLastName(jsonResponse.data.lastName);
      setDesignation(jsonResponse.data.designation);
      setEmployeeNumber(jsonResponse.data.employeeNumber);
      setPayBand(jsonResponse.data.payBand);
      setAddress(jsonResponse.data.address.fullAddress);
      setPincode(jsonResponse.data.address.pincode);
      setContractor(jsonResponse.data.contractor);
      document.getElementById("gridCheck").checked = jsonResponse.data.contractor === "true" ? true : false;
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    if(firstName === "" || firstName === "" || designation === "" || employeeNumber === "" || address === "" || pincode === "" || payBand === ""){
      alert("Please fill all details...");
      return;
    }
    let data = {
      firstName: firstName,
      lastName: lastName,
      designation: designation,
      contractor: contractor,
      employeeNumber: employeeNumber,
      address: {
           fullAddress: address,
           pincode: pincode
      },
      payBand: payBand
    }

    axios.put(`${url}spring/employee/${id}`, data).then((response) => {
      history("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  const onChangeContractor = () => {
    let contractorCheckBox = document.getElementById("gridCheck");
    if(contractorCheckBox.checked) {
      contractorCheckBox.checked = true;
      setContractor("true");
    } else {
      contractorCheckBox.checked = false;
      setContractor("false");
    }
  }

  useEffect(() => {
    getEmployeeById(id);
  },[])

  return (
      <div className='container' style={tableBox}>
        <h5 className='my-3'>Edit Employee</h5>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputFirstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputDesignation" className="form-label">Designation</label>
            <input type="text" className="form-control" id="inputDesignation" value={designation} onChange={(e) => setDesignation(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmployeeNumber" className="form-label">Employee Number</label>
            <input type="text" className="form-control" id="inputEmployeeNumber" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} readOnly/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPayBand" className="form-label">Pay Band</label>
            <input type="text" className="form-control" id="inputPayBand" value={payBand} onChange={(e) => setPayBand(e.target.value)}/>
          </div>
          <div className="col-10">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputPincode" className="form-label">Pincode</label>
            <input type="text" className="form-control" id="inputPincode" value={pincode} onChange={(e) => setPincode(e.target.value)}/>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" onChange={(e) => {
                setContractor(e.target.value)
                onChangeContractor()
                }}/>
              <label className="form-check-label" htmlFor="gridCheck">
                Contractor
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Edit Employee</button>
          </div>
        </form>
      </div>
  )
}
