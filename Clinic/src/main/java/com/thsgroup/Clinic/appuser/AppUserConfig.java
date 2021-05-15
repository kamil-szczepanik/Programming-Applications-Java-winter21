package com.thsgroup.Clinic.appuser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class AppUserConfig {

    private final AppUserService appUserService;

    @Bean
    CommandLineRunner commandLineAppUserRunner(AppUserRepository repository){

        AppUser defaultAppUser = new AppUser("admin", "admin", "admin@clinic.com", "password", AppUserRole.ADMIN);
        boolean defaultAdminExists = appUserService.defaultFirstAppUserExists();
        if (!defaultAdminExists) {
            appUserService.addNewAppUser(defaultAppUser);
            appUserService.enableAppUser("admin@clinic.com");
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
