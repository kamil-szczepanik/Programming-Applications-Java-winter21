package com.thsgroup.Clinic.Doctor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    
    public List<Doctor> getDoctors() {
		return List.of(
			new Doctor(
				1L,
				"Piotr",
				"Fryzowski",
				"urolog"
			)
		);
}

}
