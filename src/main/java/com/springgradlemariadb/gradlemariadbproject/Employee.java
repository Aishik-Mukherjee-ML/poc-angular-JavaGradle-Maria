package com.springgradlemariadb.gradlemariadbproject;

import java.util.Objects;

import javax.persistence.*;

import com.springgradlemariadb.gradlemariadbproject.Employee;

@Entity
@Table(name="employee")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="first_name")
	private String first_name;

	@Column(name="last_name")
	private String last_name;
	
	@Column(name="employee_number")
	private String employee_number;
	
	@Column(name="designation")
	private String designation;
	
	@Column(name="pay_band")
	private String pay_band;

//	@Column(name="address_id")
//	private Integer address_id;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="address_id")
	private EmployeeAddress address;
	
	@Column(name="contractor")
	private String contractor;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return first_name;
	}
	public void setFirstName(String first_name) {
		this.first_name = first_name;
	}

	public String getLastName() {
		return last_name;
	}
	public void setLastName(String last_name) {
		this.last_name = last_name;
	}

	public String getEmployeeNumber() {
		return employee_number;
	}
	public void setEmployeeNumber(String employee_number) {
		this.employee_number = employee_number;
	}

	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getPayBand() {
		return pay_band;
	}
	public void setPayBand(String pay_band) {
		this.pay_band = pay_band;
	}

	public EmployeeAddress getAddress() {
		return address;
	}
	public void setAddress(EmployeeAddress address) {
		this.address = address;
	}

	public String getContractor() {
		return contractor;
	}
	public void setContractor(String contractor) {
		this.contractor = contractor;
	}
	
	public Employee(String first_name, String last_name, String employee_number, String designation, String pay_band, EmployeeAddress address, String contractor) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.employee_number = employee_number;
		this.designation = designation;
		this.pay_band = pay_band;
		this.address = address;
		this.contractor = contractor;
	}
	
	public Employee() {
		super();
	}
	
	@Override
	public String toString() {
		return "Employee [name=" + first_name + last_name + ", designation=" + designation + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(employee_number, first_name, last_name);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		return Objects.equals(id, other.id) && Objects.equals(first_name, other.first_name) && Objects.equals(last_name, other.last_name) && Objects.equals(employee_number, other.employee_number) && Objects.equals(designation, other.designation) && Objects.equals(pay_band, other.pay_band) && Objects.equals(address, other.address) && Objects.equals(contractor, other.contractor);
	}

}
