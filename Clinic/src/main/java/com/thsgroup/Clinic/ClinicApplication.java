package com.thsgroup.Clinic;


import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import com.thsgroup.Clinic.patient.Patient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ClinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicApplication.class, args);
		
	}

	@GetMapping
	public List<Patient> hello() {
		return List.of(
			new Patient(1L, "Kamil", "Szczepanik", LocalDate.of(2000, Month.DECEMBER, 2), 12345678910L)
		);
	}
	

}
