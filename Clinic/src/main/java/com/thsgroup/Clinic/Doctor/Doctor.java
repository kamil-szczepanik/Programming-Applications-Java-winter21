package com.thsgroup.Clinic.Doctor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Doctor {
    @Id
    @SequenceGenerator(
        name = "doctor_sequence",
        sequenceName = "doctor_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "doctor_sequence"
    )
    private Long id;
    private String firstName;
    private String lastName;
    private String specialisation;
    private Long appUserId;


    public Doctor() {
    }

    public Doctor(String firstName, String lastName, String specialisation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialisation = specialisation;
    }

    public Doctor(Long id, String firstName, String lastName, String specialisation) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialisation = specialisation;
    }

    public Doctor(String firstName, String lastName, Long appUserId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.appUserId = appUserId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSpecialisation() {
        return this.specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

    public Long getAppUserId() { return appUserId; }

    public void setAppUserId(Long appUserId) { this.appUserId = appUserId; }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", specialisation='" + getSpecialisation() + "'" +
            ", appUserId='" + getAppUserId() + "'" +
            "}";
    }

}
