package com.thsgroup.Clinic.Appointment;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Appointment {
    @Id
    @SequenceGenerator(
        name = "appointment_sequence",
        sequenceName = "appointment_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "appointment_sequence"
    )
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime date;


    public Appointment() {
    }

    public Appointment(Long patientId, Long doctorId, LocalDateTime date) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
    }

    public Appointment(Long id, Long patientId, Long doctorId, LocalDateTime date) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return this.patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return this.doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getDate() {
        return this.date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", patientId='" + getPatientId() + "'" +
            ", doctorId='" + getDoctorId() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }

}
