package com.thsgroup.Clinic.Appointment;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppointmentConfig {
    
    @Bean
    CommandLineRunner commandLineAppointmentRunner(
        AppointmentRepository repository) {
            return args -> {
                ;
            };
    }
}
