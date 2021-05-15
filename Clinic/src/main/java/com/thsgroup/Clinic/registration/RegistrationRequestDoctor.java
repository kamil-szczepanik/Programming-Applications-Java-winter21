package com.thsgroup.Clinic.registration;

import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequestDoctor {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private final DoctorSpecialisation doctorSpecialisation;
}
