package com.thsgroup.Clinic.Doctor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    
	private final DoctorRepository doctorRepository;

	@Autowired
	public DoctorService(DoctorRepository doctorRepository) {
		this.doctorRepository = doctorRepository;
	}
	
    public List<Doctor> getDoctors() {
		return doctorRepository.findAll();
	}

	public Doctor getDoctorById(Long id) {
		return doctorRepository.findById(id).orElse(null);
	}

    public void addNewDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
    }

	public void addNewDoctors(List<Doctor> doctors) {
		doctorRepository.saveAll(doctors);
    }

	public void deleteDoctor(Long id) {
		doctorRepository.deleteById(id);
	}

	public void updateDoctor(Doctor doctor) {
		Doctor existingDoctor = doctorRepository.findById(doctor.getId()).orElse(null);
		existingDoctor.setId(doctor.getId());
		existingDoctor.setFirstName(doctor.getFirstName());
		existingDoctor.setLastName(doctor.getLastName());
		existingDoctor.setSpecialisation(doctor.getSpecialisation());
		
		doctorRepository.save(existingDoctor);
	}


}
