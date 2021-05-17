package com.thsgroup.Clinic.doctor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.time.Month;

import com.thsgroup.Clinic.Doctor.Doctor;
import com.thsgroup.Clinic.Doctor.DoctorRepository;
import com.thsgroup.Clinic.Doctor.DoctorService;
import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class DoctorServiceTest {

    @Mock
    private DoctorRepository doctorRepository;
    private DoctorService underTest;

    @BeforeEach
    void setUp() {
        underTest = new DoctorService(doctorRepository)  ; 
    }
    
    @Test
    void canGetDoctors() {
        // when
        underTest.getDoctors();
        // then
        verify(doctorRepository).findAll();
    }

    @Test
    void canAddNewDoctor() {
        // given
        Doctor doctor = new Doctor("Michael", "Scott", DoctorSpecialisation.CHIRURGIA);
        // when
        underTest.addNewDoctor(doctor);
        // then
        ArgumentCaptor<Doctor> doctorArgumentCaptor = ArgumentCaptor.forClass(Doctor.class);

        verify(doctorRepository).save(doctorArgumentCaptor.capture());

        Doctor capturedDoctor = doctorArgumentCaptor.getValue();

        assertEquals(capturedDoctor, doctor);
    }
}
