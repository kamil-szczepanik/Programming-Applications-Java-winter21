package com.thsgroup.Clinic.Appointment;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppointmentConfig {
    
    @Bean
    CommandLineRunner commandLineAppointmentRunner(
        AppointmentRepository repository) {
            return args -> {
                Appointment first = new Appointment(
				21L, 
                22L,
                LocalDateTime.of(2021, 5, 4, 15, 30)
			);
            repository.saveAll(
                List.of(first)
            );
            };
    }
}
