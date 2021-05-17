package com.thsgroup.Clinic.Doctor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DoctorConfig {
    
    @Bean
    CommandLineRunner commandLineDoctorRunner(
        DoctorRepository repository) {
            return args -> {
                ;
            };
    }
}
