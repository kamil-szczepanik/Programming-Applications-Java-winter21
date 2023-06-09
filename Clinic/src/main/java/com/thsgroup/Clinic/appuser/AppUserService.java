package com.thsgroup.Clinic.appuser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.thsgroup.Clinic.Admin.Admin;
import com.thsgroup.Clinic.Admin.AdminService;
import com.thsgroup.Clinic.Doctor.Doctor;
import com.thsgroup.Clinic.Doctor.DoctorService;
import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;
import com.thsgroup.Clinic.registration.token.ConfirmationToken;
import com.thsgroup.Clinic.registration.token.ConfirmationTokenService;

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
    private final DoctorService doctorService;
    private final AdminService adminService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email).
                                    orElseThrow(()-> 
                                        new UsernameNotFoundException(
                                            String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(AppUser appUser, String pesel, LocalDate dob, DoctorSpecialisation doctorSpecialisation) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        
        
        if(userExists) {
            if (checkIfAttributesAreTheSame(appUser) && !appUserRepository.findByEmail(appUser.getEmail()).get().getEnabled()) {
                String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

                appUser.setPassword(encodedPassword);
                
                updateAppUser(appUser);
        
                String token = UUID.randomUUID().toString();
                ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    appUserRepository.findByEmail(appUser.getEmail()).get(),
                    pesel,
                    dob,
                    doctorSpecialisation
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
            appUser,
            pesel,
            dob,
            doctorSpecialisation
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

    public List<AppUser> getAppUsers() {
        return appUserRepository.findAll();
    }

    public AppUser getAppUserById(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }

    public void addNewAppUser(AppUser appUser) {
        appUserRepository.save(appUser);
    }

    public void deleteAppUser(Long id) {
        appUserRepository.deleteById(id);
    }

    public String signUpDoctor(AppUser appUser, DoctorSpecialisation doctorSpecialisation) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        
        if(userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUser.setEnabled(true);

        appUserRepository.save(appUser);
        
        Doctor newDoctor = new Doctor(appUser.getFirstName(), 
                                        appUser.getLastName(), 
                                        doctorSpecialisation, 
                                        appUser.getId());
        doctorService.addNewDoctor(newDoctor);

        return "Created doctor and his account";
    }

    public String signUpAdmin(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        
        if(userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUser.setEnabled(true);
        appUserRepository.save(appUser);
        
        Admin newAdmin = new Admin(appUser.getFirstName(), 
                                        appUser.getLastName(), 
                                        appUser.getId());
        adminService.addNewAdmin(newAdmin);


        return "Created admin and his account";
    }

    boolean defaultFirstAppUserExists() {
        AppUser defaultAppUser = new AppUser("admin", "admin", "admin@clinic.com", "password", AppUserRole.ADMIN);
        boolean exists = checkIfAttributesAreTheSame(defaultAppUser);
        return exists;
    }
    
}
