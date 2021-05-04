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
    private Long patient_id;
    private Long doctor_id;
    private LocalDateTime date;


    public Appointment() {
    }


    public Appointment(Long patient_id, Long doctor_id, LocalDateTime date) {
        this.patient_id = patient_id;
        this.doctor_id = doctor_id;
        this.date = date;
    }

    public Appointment(Long id, Long patient_id, Long doctor_id, LocalDateTime date) {
        this.id = id;
        this.patient_id = patient_id;
        this.doctor_id = doctor_id;
        this.date = date;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatient_id() {
        return this.patient_id;
    }

    public void setPatient_id(Long patient_id) {
        this.patient_id = patient_id;
    }

    public Long getDoctor_id() {
        return this.doctor_id;
    }

    public void setDoctor_id(Long doctor_id) {
        this.doctor_id = doctor_id;
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
            ", patient_id='" + getPatient_id() + "'" +
            ", doctor_id='" + getDoctor_id() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }

}
