package com.thsgroup.Clinic.patient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{
    

    // @Query("SELECT p FROM Patient p WHERE p.pesel = ?1")
    // Patient findByPesel(String pesel);
    Optional<Patient> findByPesel(String pesel);


    @Query("SELECT p FROM Patient p WHERE p.appUserId = ?1")
    Patient findByAppUserId(Long appUserId);

}
