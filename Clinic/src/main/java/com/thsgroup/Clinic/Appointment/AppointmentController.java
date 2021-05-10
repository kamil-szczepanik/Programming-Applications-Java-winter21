package com.thsgroup.Clinic.Appointment;

import java.util.List;

import com.thsgroup.Clinic.appuser.AppUser;
import com.thsgroup.Clinic.appuser.AppUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    public void registerNewAppointment(@RequestBody Appointment appointment) {
        appointmentService.addNewAppointment(appointment);
    }

    // @ResponseBody
    // @PostMapping("/save")
    // public void saveAppointment(Appointment appointment) {
    //     String username = SecurityContextHolder.getContext().getAuthentication().getName();
    //     AppUser user = appUserRepository.findByEmail(username).get();


    // }

    
}
