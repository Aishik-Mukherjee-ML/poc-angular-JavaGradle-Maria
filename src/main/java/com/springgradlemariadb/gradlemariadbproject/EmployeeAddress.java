package com.springgradlemariadb.gradlemariadbproject;

import java.util.Objects;

import javax.persistence.*;

import com.springgradlemariadb.gradlemariadbproject.EmployeeAddress;

@Entity
@Table(name="emp_address")
public class EmployeeAddress {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="full_address")
	private String full_address;

	@Column(name="pincode")
	private String pincode;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getFullAddress() {
		return full_address;
	}
	public void setFullAddress(String full_address) {
		this.full_address = full_address;
	}

	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	
	public EmployeeAddress(String full_address, String pincode) {
		super();
		this.full_address = full_address;
		this.pincode = pincode;
	}
	
	public EmployeeAddress() {
		super();
	}
	
	@Override
	public String toString() {
		return "Employee Address [full_address=" + full_address + ", pincode=" + pincode + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(full_address, pincode);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmployeeAddress other = (EmployeeAddress) obj;
		return Objects.equals(id, other.id) && Objects.equals(full_address, other.full_address) && Objects.equals(pincode, other.pincode);
	}

}
