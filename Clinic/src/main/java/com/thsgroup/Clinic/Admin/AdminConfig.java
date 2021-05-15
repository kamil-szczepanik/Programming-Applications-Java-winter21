package com.thsgroup.Clinic.Admin;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class AdminConfig {

    private final AdminService adminService;
    

    @Bean
    CommandLineRunner commandLineAdminRunner(AdminRepository repository){

        Admin defaultAdmin = new Admin("admin", "admin", 1L);
        boolean defaultAdminExists = adminService.defaultFirstAdminExists();
        if (!defaultAdminExists) {
            adminService.addNewAdmin(defaultAdmin);
        }


        return args -> {
            // Admin kevin = new Admin(
            //     1L,
            //     "Kevin",
            //     "Mallone"
            // );


            // Admin oscar = new Admin(
            //     "Oscar",
            //     "Martinez"
            // );

            // repository.saveAll(
            //     List.of(kevin, oscar)
            //     );
        };
    }
    
}
