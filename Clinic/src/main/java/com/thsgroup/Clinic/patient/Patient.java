package com.thsgroup.Clinic.patient;

import java.time.LocalDate;
import java.time.Period;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table
public class Patient {
    
    @Id
    @SequenceGenerator(
        name = "patient_sequence",
        sequenceName = "patient_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "patient_sequence"
    )
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private Long pesel;
    @Transient
    private Integer age;

    
    public Patient() {
    }

    public Patient(Long id, String firstName, String lastName, LocalDate dob, Long pesel){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.pesel = pesel;
    }

    public Patient(String firstName, String lastName, LocalDate dob, Long pesel){
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.pesel = pesel;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public LocalDate getDob() { return dob; }

    public void setDob(LocalDate dob) { this.dob = dob; }

    public Integer getAge() { return Period.between(this.dob, LocalDate.now()).getYears(); }
    
    public void setAge(Integer age) { this.age = age; }

    public Long getPesel() { return pesel; }

    public void setPesel(Long pesel) { this.pesel = pesel; }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", dob='" + getDob() + "'" +
            ", pesel='" + getPesel() + "'" +
            ", age='" + getAge() + "'" +
            "}";
    }


}
