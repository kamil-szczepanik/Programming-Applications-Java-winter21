package com.thsgroup.Clinic.Doctor;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DoctorConfig {
    
    @Bean
    CommandLineRunner commandLineRunner(
        DoctorRepository repository) {
            return args -> {
                Doctor piotr = new Doctor(
				"Piotr",
				"Fryzowski",
				"urolog"
			);
                Doctor ewa = new Doctor(
				"Ewa",
				"Stroz",
				"pediatra"
			);
            repository.saveAll(
                List.of(piotr, ewa)
            );
            };
    }
}
