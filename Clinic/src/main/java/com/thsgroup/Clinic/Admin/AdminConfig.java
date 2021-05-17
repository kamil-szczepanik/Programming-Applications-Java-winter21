package com.thsgroup.Clinic.Admin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class AdminConfig {

    @Bean
    CommandLineRunner commandLineAdminRunner(AdminRepository repository){

        return args -> {
            ;
        };
    }
    
}
