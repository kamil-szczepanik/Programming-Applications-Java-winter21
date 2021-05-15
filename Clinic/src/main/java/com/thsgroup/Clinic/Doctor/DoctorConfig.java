package com.thsgroup.Clinic.Doctor;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DoctorConfig {
    
    @Bean
    CommandLineRunner commandLineDoctorRunner(
        DoctorRepository repository) {
            return args -> {
                Doctor piotr = new Doctor(
				"Piotr",
				"Fryzowski",
				DoctorSpecialisation.CHIRURGIA
			);
                Doctor ewa = new Doctor(
				"Ewa",
				"Stroz",
				DoctorSpecialisation.DERMATOLOGIA
			);
            // repository.saveAll(
            //     List.of(piotr, ewa)
            // );
            };
    }
}
