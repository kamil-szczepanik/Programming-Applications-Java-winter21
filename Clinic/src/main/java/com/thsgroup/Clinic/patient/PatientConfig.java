package com.thsgroup.Clinic.patient;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PatientConfig {

    @Bean
    CommandLineRunner commandLineRunner(PatientRepository repository){
        return args -> {
            Patient michael = new Patient(
                1L,
                "Michael",
                "Scott",
                LocalDate.of(1981, Month.MARCH, 3),
                12345678910L
            );

            Patient dwight = new Patient(
                "Dwight",
                "Schrute",
                LocalDate.of(1984, Month.DECEMBER, 13),
                92838383921L
            );

            repository.saveAll(
                List.of(michael, dwight)
                );
        };
    }
    
}
