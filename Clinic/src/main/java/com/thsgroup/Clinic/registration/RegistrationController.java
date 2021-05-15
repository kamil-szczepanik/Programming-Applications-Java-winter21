package com.thsgroup.Clinic.registration;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path= "api/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("patient")
    public String registerPatient(@RequestBody RegistrationRequestPatient request) {
        return registrationService.registerPatient(request);
    }

    @PostMapping("doctor")
    public String registerDoctor(@RequestBody RegistrationRequestDoctor request) {
        return registrationService.registerDoctor(request);
    }

    @PostMapping("admin")
    public String registerAdmin(@RequestBody RegistrationRequest request) {
        return registrationService.registerAdmin(request);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
