package com.thsgroup.Clinic.doctor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.thsgroup.Clinic.Doctor.Doctor;
import com.thsgroup.Clinic.Doctor.DoctorRepository;
import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class DoctorRepositoryTest {
    
    @Autowired
    private DoctorRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfDoctorExists() {

        // given
        Doctor doctor = new Doctor("Michael", "Scott", DoctorSpecialisation.CHIRURGIA);
        underTest.save(doctor);

        // when
        boolean exists = underTest.existsById(doctor.getId());

        // then
        assertTrue(exists);
    }

    @Test
    void itShouldCheckIfDoctorDoesNotExists() {

        // given
        Doctor doctor = new Doctor("Michael", "Scott", DoctorSpecialisation.CHIRURGIA);
        underTest.save(doctor);

        // when
        boolean exists = underTest.existsById(2L);

        // then
        assertFalse(exists);
        // assertEquals(foundedDoctor.getLastName(), "Scott");
    }

    @Test
    void itShouldCheckIfDoctorCanBeFoundByAppUserId() {

        // given
        Doctor doctor = new Doctor("Michael", "Scott", DoctorSpecialisation.CHIRURGIA, 14L);
        underTest.save(doctor);

        // when
        Doctor foundedDoctor = underTest.findByAppUserId(14L);

        // then
        assertEquals(foundedDoctor.getFirstName(), "Michael");
        assertEquals(foundedDoctor.getLastName(), "Scott");
        assertEquals(foundedDoctor.getAppUserId(), 14L);
        assertEquals(foundedDoctor.getSpecialisation(), DoctorSpecialisation.CHIRURGIA);
    }

}
