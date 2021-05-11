package com.thsgroup.Clinic.Doctor;

import java.util.List;

import com.thsgroup.Clinic.Appointment.Appointment;
import com.thsgroup.Clinic.Appointment.AppointmentRepository;
import com.thsgroup.Clinic.appuser.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/doctor")
public class DoctorController {
    private final DoctorService doctorService;

    @Autowired
    private AppointmentRepository appointmentRepository;


    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }
    
    @GetMapping
    public List<Doctor> getDoctors() {
        return doctorService.getDoctors();
    }

    @GetMapping("{id}")
    public Doctor findDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @PostMapping
    public void registerNewDoctor(@RequestBody Doctor doctor) {
        doctorService.addNewDoctor(doctor);
    }
    
    @PostMapping("addDoctors")
    public void registerNewDoctors(@RequestBody List<Doctor> doctors) {
        doctorService.addNewDoctors(doctors);
    }

    @PutMapping("update")
    public void updateDoctor(@RequestBody Doctor doctor) {
        doctorService.updateDoctor(doctor);
    }

    @DeleteMapping("delete/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }

    @ResponseBody
    @GetMapping("/getAppointmentsOfLoggedDoctor")
    public List<Appointment> getAppointmentsOfLoggedPatient() {
        AppUser appUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appointmentRepository.findByDoctorId(appUser.getId());
    }


}
