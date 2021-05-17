package com.thsgroup.Clinic.appointment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.List;

import com.thsgroup.Clinic.Appointment.Appointment;
import com.thsgroup.Clinic.Appointment.AppointmentRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class AppointmentRepositoryTest {
    
    @Autowired
    private AppointmentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }


    @Test
    void itShouldCheckIfAppointmentDoesNotExists() {

        // given
        Appointment appointment = new Appointment(1L, 2L, 3L, LocalDateTime.of(2021, 5, 20, 12, 00, 00));
        underTest.save(appointment);

        // when
        boolean exists = underTest.existsById(2L);

        // then
        assertFalse(exists);
        // assertEquals(foundedAppointment.getLastName(), "Scott");
    }

    @Test
    void itShouldCheckIfAppointmentCanBeFoundByDoctorId() {

        // given
        Appointment appointment = new Appointment(1L, 2L, 3L, LocalDateTime.of(2021, 5, 20, 12, 00, 00));
        underTest.save(appointment);

        // when
        List<Appointment> foundedAppointments = underTest.findByDoctorId(3L);

        // then
        assertEquals(1, foundedAppointments.size()); 
    }

}
