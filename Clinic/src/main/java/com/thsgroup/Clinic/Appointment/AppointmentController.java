package com.thsgroup.Clinic.Appointment;

import java.util.List;

import com.thsgroup.Clinic.appuser.AppUser;
import com.thsgroup.Clinic.appuser.AppUserRepository;

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
@RequestMapping(path = "api/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    // @Autowired
    // private AppUserRepository appUserRepository;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    
    @GetMapping
    public List<Appointment> getAppointments() {
        return appointmentService.getAppointments();
    }

    @GetMapping("{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("byPatientId/{patientId}")
    public List<Appointment> getAppointmentByPatientId(@PathVariable Long patientId) {
        return appointmentService.getAppointmentByPatientId(patientId);
    }

    @GetMapping("byDoctorId/{doctorId}")
    public List<Appointment> getAppointmentByDoctorId(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentByDoctorId(doctorId);
    }


    @PostMapping("registerNewAppointment")
    public void registerNewAppointment(@RequestBody Appointment appointment) {
        appointmentService.addNewAppointment(appointment);
    }

    @PostMapping("addAppointments")
    public void registerNewAppointments(@RequestBody List<Appointment> appointments) {
        appointmentService.addNewAppointments(appointments);
    }

    @PutMapping("update")
    public void updateAppointment(@RequestBody Appointment appointment) {
        appointmentService.updateAppointment(appointment);
    }

    @DeleteMapping("delete/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }



    // @ResponseBody
    // @PostMapping("/save")
    // public void saveAppointment(Appointment appointment) {
    //     String username = SecurityContextHolder.getContext().getAuthentication().getName();
    //     AppUser user = appUserRepository.findByEmail(username).get();


    // }

    
}
