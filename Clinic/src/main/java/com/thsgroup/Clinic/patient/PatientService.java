package com.thsgroup.Clinic.patient;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PatientService {
    
    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getPatients() {
		return patientRepository.findAll();
	}

    public Patient getPatientById(Long id) {
		return patientRepository.findById(id).orElse(null);
	}

    public void addNewPatient(Patient patient) {
        patientRepository.save(patient);
    }

    public void addNewPatients(List<Patient> patients) {
        patientRepository.saveAll(patients);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public void updatePatient(Patient patient){
        Patient existingPatient = patientRepository.findById(patient.getId()).orElse(null);
        existingPatient.setId(patient.getId());
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setDob(patient.getDob());
        existingPatient.setPesel(patient.getPesel());
        existingPatient.setAge(patient.getAge());

        patientRepository.save(existingPatient);

    }
}
