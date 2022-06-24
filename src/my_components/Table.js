import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Popup from './Popup';
import {
    Link
} from "react-router-dom";

export const Table = () => {
  let tableBox = {
    minHeight: "80vh"
  }

  const [employees, setEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});

  const url = "http://localhost:8080/";

  const getEmployees = () => {
    axios.get(`${url}spring/employees`).then((jsonResponse) => {
      // console.log(jsonResponse);
      setEmployees(jsonResponse.data);
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleDelete = (id) => {
    if(id > 0) {
        axios.delete(`${url}spring/employee/${id}`).then((jsonResponse) => {
            // console.log(jsonResponse);
            getEmployees();
        }).catch((error) => {
            console.log(error)
        })
    } else {
        alert("Invalid Id..");
    }
  }

  const handleSeeDetails = (emp) => {
    console.log(emp);
    setIsOpen(!isOpen);
    setEmployeeDetails(JSON.stringify(emp));
  }

  useEffect(() => {
    getEmployees();
  },[])

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='container my-3' style={tableBox}>
        <h5 className='my-3'>Employees Details</h5>
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Employee Number</th>
                <th scope="col">Contractor</th>
                <th colSpan={3} scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees && employees.map((emp, index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{emp.firstName} {emp.lastName}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.employeeNumber}</td>
                                <td>{emp.contractor}</td>
                                <td><button type="button" className="btn btn-sm btn-success" onClick={() => handleSeeDetails(emp)}>See Details</button></td>
                                <td><button type="button" className="btn btn-sm btn-primary"><Link className="nav-link active" aria-current="page" to={`/editemployee/${emp.id}`}>Edit</Link></button></td>
                                <td><button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {isOpen && <Popup
          content={<>
            <h5>Employee Details</h5>
            <hr />
            <label><b>Name : </b> <span>{JSON.parse(employeeDetails).firstName} {JSON.parse(employeeDetails).lastName}</span></label><br />
            <label><b>Designation : </b> <span>{JSON.parse(employeeDetails).designation}</span></label><br />
            <label><b>Employee Number : </b> <span>{JSON.parse(employeeDetails).employeeNumber}</span></label><br />
            <label><b>Pay Band : </b> <span>{JSON.parse(employeeDetails).payBand}</span></label><br />
            <label><b>Address : </b> <span>{JSON.parse(employeeDetails).address.fullAddress}</span></label><br />
            <label><b>Pincode : </b> <span>{JSON.parse(employeeDetails).address.pincode}</span></label><br />
            <label><b>Contractor : </b> <span>{JSON.parse(employeeDetails).contractor}</span></label><br />
            </>}
          handleClose={togglePopup}
        />}
    </div>
  )
}
