package com.thsgroup.Clinic.Admin;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminConfig {

    @Bean
    CommandLineRunner commandLineAdminRunner(AdminRepository repository){
        return args -> {
            Admin kevin = new Admin(
                1L,
                "Kevin",
                "Mallone"
            );

            Admin oscar = new Admin(
                "Oscar",
                "Martinez"
            );

            // repository.saveAll(
            //     List.of(kevin, oscar)
            //     );
        };
    }
    
}
