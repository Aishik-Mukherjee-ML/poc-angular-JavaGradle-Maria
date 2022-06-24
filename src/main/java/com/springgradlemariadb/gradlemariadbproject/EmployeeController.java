package com.springgradlemariadb.gradlemariadbproject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EmployeeController {
	
	private final EmployeeRepository employeeRepository;
	private final EmployeeAddressRepository employeeAddressRepository;
	
	@Autowired
	public EmployeeController(EmployeeRepository employeeRepository, EmployeeAddressRepository employeeAddressRepository) {
		this.employeeRepository = employeeRepository;
		this.employeeAddressRepository = employeeAddressRepository;
	}
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	@GetMapping("/employee/{id}")
    public ResponseEntity <Employee> getEmployeeById(@PathVariable(value = "id") int employeeId)
    throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
        return ResponseEntity.ok().body(employee);
    }
    
    @PostMapping("/employee")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }
    
    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") int employeeId,
        @RequestBody Employee employeeDetails) throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));

        EmployeeAddress employee_address = employeeAddressRepository.findById(employee.getAddress().getId()).orElseThrow(() -> new ResourceNotFoundException("Employee Address not found for this id :: " + employeeId));

        employee_address.setFullAddress(employeeDetails.getAddress().getFullAddress());
        employee_address.setPincode(employeeDetails.getAddress().getPincode());
        final EmployeeAddress updatedEmployeeAddress = employeeAddressRepository.save(employee_address);
        
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setPayBand(employeeDetails.getPayBand());
        employee.setAddress(updatedEmployeeAddress);
        employee.setContractor(employeeDetails.getContractor());
        final Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }
    
    @DeleteMapping("/employee/{id}")
    public Map < String, Boolean > deleteEmployee(@PathVariable(value = "id") int employeeId)
    throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));

        employeeRepository.delete(employee);
        Map <String, Boolean> response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
