package com.thsgroup.Clinic.Appointment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Optional<Appointment> findByPatient_id(Long patient_id); może to też mogłoby być
    @Query("SELECT a FROM Appointment a WHERE a.patientId = ?1")
    List<Appointment> findByPatientId(Long patientId);

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = ?1")
    List<Appointment> findByDoctorId(Long doctorId);

    // te dwa findy niżej to to samo tylko ze otrzymuje sie liste id wizyt
    @Query("SELECT a.id FROM Appointment a WHERE a.patientId = ?1")
    List<Long> findAppointmentIdByPatientId(Long patientId);

    @Query("SELECT a.id FROM Appointment a WHERE a.doctorId = ?1")
    List<Long> findAppointmentIdByDoctorId(Long doctorId);

}