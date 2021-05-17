package com.thsgroup.Clinic.patient;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class PatientRepositoryTest {
    
    @Autowired
    private PatientRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfPatientExists() {

        // given
        Patient patient = new Patient("Michael", "Scott", LocalDate.of(1981, Month.AUGUST, 3), "12345678910", 14L);
        underTest.save(patient);

        // when
        boolean exists = underTest.existsById(patient.getId());

        // then
        assertTrue(exists);
        // assertEquals(foundedPatient.getLastName(), "Scott");
    }

    @Test
    void itShouldCheckIfPatientDoesNotExists() {

        // given
        Patient patient = new Patient("Michael", "Scott", LocalDate.of(1981, Month.AUGUST, 3), "12345678910", 14L);
        underTest.save(patient);

        // when
        boolean exists = underTest.existsById(2L);

        // then
        assertFalse(exists);
        // assertEquals(foundedPatient.getLastName(), "Scott");
    }

    @Test
    void itShouldCheckIfPatientCanBeFoundByAppUserId() {

        // given
        Patient patient = new Patient("Michael", "Scott", LocalDate.of(1981, Month.AUGUST, 3), "12345678910", 14L);
        underTest.save(patient);

        // when
        Patient foundedPatient = underTest.findByAppUserId(14L);

        // then
        assertEquals(foundedPatient.getFirstName(), "Michael");
        assertEquals(foundedPatient.getLastName(), "Scott");
        assertEquals(foundedPatient.getPesel(), "12345678910");
        assertEquals(foundedPatient.getDob(), LocalDate.of(1981, Month.AUGUST, 3));
        assertEquals(foundedPatient.getAppUserId(), 14L);
    }

}
