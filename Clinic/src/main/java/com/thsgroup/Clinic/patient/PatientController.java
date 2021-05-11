package com.thsgroup.Clinic.patient;

import java.util.List;

import com.thsgroup.Clinic.Appointment.Appointment;
import com.thsgroup.Clinic.Appointment.AppointmentRepository;
import com.thsgroup.Clinic.appuser.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping(path = "api/patient")
@RestController
public class PatientController {

    private final PatientService patientService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
	public List<Patient> getPatients() {
        return patientService.getPatients();
    }

    @GetMapping("{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping("registerNewPatient")
    public void registerNewPatient(@RequestBody Patient patient) {
        patientService.addNewPatient(patient);
    }

    @PostMapping("addPatients")
    public void registerNewPatients(@RequestBody List<Patient> patients) {
        patientService.addNewPatients(patients);
    }

    @PutMapping("update")
    public void updatePatient(@RequestBody Patient patient) {
        patientService.updatePatient(patient);
    }

    @DeleteMapping("delete/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }

    @ResponseBody
    @GetMapping("/getAppointmentsOfLoggedPatient")
    public List<Appointment> getAppointmentsOfLoggedPatient() {
        AppUser appUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appointmentRepository.findByPatientId(appUser.getId());
    }

}
