package com.thsgroup.Clinic.patient;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PatientConfig {

    @Bean
    CommandLineRunner commandLinePatientRunner(PatientRepository repository){
        return args -> {
            ;
        };
    }
    
}
