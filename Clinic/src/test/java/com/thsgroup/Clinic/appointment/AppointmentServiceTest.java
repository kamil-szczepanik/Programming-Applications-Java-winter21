package com.thsgroup.Clinic.appointment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;

import com.thsgroup.Clinic.Appointment.Appointment;
import com.thsgroup.Clinic.Appointment.AppointmentRepository;
import com.thsgroup.Clinic.Appointment.AppointmentService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository appointmentRepository;
    private AppointmentService underTest;

    @BeforeEach
    void setUp() {
        underTest = new AppointmentService(appointmentRepository)  ; 
    }
    
    @Test
    void canGetAppointments() {
        // when
        underTest.getAppointments();
        // then
        verify(appointmentRepository).findAll();
    }

    @Test
    void canAddNewAppointment() {
        // given
        Appointment appointment = new Appointment(1L, 2L, 3L, LocalDateTime.of(2021, 5, 20, 12, 00, 00));
        // when
        underTest.addNewAppointment(appointment);
        // then
        ArgumentCaptor<Appointment> appointmentArgumentCaptor = ArgumentCaptor.forClass(Appointment.class);

        verify(appointmentRepository).save(appointmentArgumentCaptor.capture());

        Appointment capturedAppointment = appointmentArgumentCaptor.getValue();

        assertEquals(capturedAppointment, appointment);
    }
}
