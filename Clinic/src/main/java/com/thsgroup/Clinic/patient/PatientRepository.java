package com.thsgroup.Clinic.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

    // @Query("SELECT p FROM Patient p WHERE p.email = ?1")
    // Patient findPatientByAppUserId(Long appUserId);
    
}
