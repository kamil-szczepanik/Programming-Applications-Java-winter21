package com.thsgroup.Clinic.patient;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;
    private PatientService underTest;

    @BeforeEach
    void setUp() {
        underTest = new PatientService(patientRepository)  ; 
    }
    
    @Test
    void canGetPatients() {
        // when
        underTest.getPatients();
        // then
        verify(patientRepository).findAll();
    }

    @Test
    void canAddNewPatient() {
        // given
        Patient patient = new Patient("Michael", "Scott", LocalDate.of(1981, Month.AUGUST, 3), "12345678910", 14L);
        // when
        underTest.addNewPatient(patient);
        // then
        ArgumentCaptor<Patient> patientArgumentCaptor = ArgumentCaptor.forClass(Patient.class);

        verify(patientRepository).save(patientArgumentCaptor.capture());

        Patient capturedPatient = patientArgumentCaptor.getValue();

        assertEquals(capturedPatient, patient);
    }
}
