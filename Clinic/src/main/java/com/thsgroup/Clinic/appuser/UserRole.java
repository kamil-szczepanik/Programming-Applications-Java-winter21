package com.thsgroup.Clinic.appuser;


import javax.persistence.*;

@Entity
@Table(name = "roles")
public class UserRole {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private AppUserRole name;

	public UserRole() {

	}

	public UserRole(AppUserRole name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public AppUserRole getName() {
		return name;
	}

	public void setName(AppUserRole name) {
		this.name = name;
	}
}
