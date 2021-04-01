package com.thsgroup.Clinic.Doctor;

public class Doctor {
    private Long id;
    private String firstName;
    private String lastName;
    private String specialisation;


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

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", specialisation='" + getSpecialisation() + "'" +
            "}";
    }

}
