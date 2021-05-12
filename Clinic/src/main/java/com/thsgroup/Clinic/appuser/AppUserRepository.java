package com.thsgroup.Clinic.appuser;

import java.util.Optional;

import com.thsgroup.Clinic.Doctor.Doctor;
import com.thsgroup.Clinic.patient.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long>{

    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
           "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);


    @Query("SELECT d FROM Doctor d WHERE d.appUserId = ?1")
    Doctor findDoctorByAppUserId(Long appUserId);

    @Query("SELECT p FROM Patient p WHERE p.appUserId = ?1")
    Patient findPatientByAppUserId(Long appUserId);


}
