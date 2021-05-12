package com.thsgroup.Clinic.appuser;

import java.time.LocalDateTime;
import java.util.UUID;

import com.thsgroup.Clinic.registration.token.ConfirmationToken;
import com.thsgroup.Clinic.registration.token.ConfirmationTokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService{
    private final static String USER_NOT_FOUND_MSG = 
        "user with email %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email).
                                    orElseThrow(()-> 
                                        new UsernameNotFoundException(
                                            String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        
        
        if(userExists) {
            if (checkIfAttributesAreTheSame(appUser) && !appUser.getEnabled()) {
                String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

                appUser.setPassword(encodedPassword);
                
                updateAppUser(appUser);
        
                String token = UUID.randomUUID().toString();
                ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    appUserRepository.findByEmail(appUser.getEmail()).get()
                );
        
                confirmationTokenService.saveConfirmationToken(confirmationToken);
        
                return token;
            }
            else {
                throw new IllegalStateException("email already taken");
            }
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
            token,
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(15),
            appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public boolean checkIfAttributesAreTheSame(AppUser appUser) {
        boolean emailExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        if (emailExists) {
            boolean firstNameTheSame = appUserRepository.findByEmail(appUser.getEmail()).get().getFirstName().equals(appUser.getFirstName());
            boolean lastNameTheSame = appUserRepository.findByEmail(appUser.getEmail()).get().getLastName().equals(appUser.getLastName());

            if (firstNameTheSame && lastNameTheSame) {
                return true;
            }
        }

        return false;
    }

    public void updateAppUser(AppUser appUser) {
        AppUser existingAppUser = appUserRepository.findByEmail(appUser.getEmail()).get();
        existingAppUser.setFirstName(appUser.getFirstName());
        existingAppUser.setLastName(appUser.getLastName());
        existingAppUser.setPassword(appUser.getPassword());

        appUserRepository.save(existingAppUser);
	}
}
