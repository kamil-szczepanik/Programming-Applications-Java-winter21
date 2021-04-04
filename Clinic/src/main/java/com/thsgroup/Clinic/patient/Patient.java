package com.thsgroup.Clinic.patient;

import java.time.LocalDate;
import java.time.Period;

public class Patient {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private Long pesel;
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

    public Integer getAge() { return Period.between(dob, LocalDate.now()).getYears(); }
    
    public void setAge(Integer age) { this.age = age; }

    public Long getPesel() { return pesel; }

    public void setPesel(Long pesel) { this.pesel = pesel; }


}
