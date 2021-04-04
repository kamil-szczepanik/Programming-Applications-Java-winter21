package com.thsgroup.Clinic.patient;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class PatientService {
    

    public List<Patient> getPatients() {
		return List.of(
			new Patient(
                    1L, 
                    "Kamil", 
                    "Szczepanik", 
                    LocalDate.of(2000, Month.DECEMBER, 2), 
                    12345678910L)
		);
	}
}
