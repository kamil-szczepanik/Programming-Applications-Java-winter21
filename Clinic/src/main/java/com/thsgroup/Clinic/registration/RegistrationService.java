package com.thsgroup.Clinic.registration;

import java.time.LocalDateTime;

import com.thsgroup.Clinic.Admin.Admin;
import com.thsgroup.Clinic.Admin.AdminService;
import com.thsgroup.Clinic.Doctor.Doctor;
import com.thsgroup.Clinic.Doctor.DoctorService;
import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;
import com.thsgroup.Clinic.appuser.AppUser;
import com.thsgroup.Clinic.appuser.AppUserRepository;
import com.thsgroup.Clinic.appuser.AppUserRole;
import com.thsgroup.Clinic.appuser.AppUserService;
import com.thsgroup.Clinic.email.EmailSender;
import com.thsgroup.Clinic.patient.Patient;
import com.thsgroup.Clinic.patient.PatientService;
import com.thsgroup.Clinic.registration.token.ConfirmationToken;
import com.thsgroup.Clinic.registration.token.ConfirmationTokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {


    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final AppUserRepository appUserRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final AdminService adminService;
    


    public String registerPatient(RegistrationRequestPatient request) {
       boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
           throw new IllegalStateException("email not valid");
        }

        String token = appUserService.signUpUser(
            new AppUser(
                    request.getFirstName(),
                    request.getLastName(), 
                    request.getEmail(), 
                    request.getPassword(), 
                    AppUserRole.PATIENT
                    ),
                    request.getPesel(),
                    request.getDob(),
                    null
        );

        String link = "http://localhost:8080/api/registration/confirm?token=" + token;

        emailSender.send(request.getEmail(), buildEmail(request.getFirstName(), link));

        return token;
    }

    public String registerDoctor(RegistrationRequestDoctor request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
 
         if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
         }
 
         String token = appUserService.signUpUser(
             new AppUser(
                     request.getFirstName(),
                     request.getLastName(), 
                     request.getEmail(), 
                     request.getPassword(), 
                     AppUserRole.DOCTOR),
                     null,
                     null,
                     request.getDoctorSpecialisation()
         );
 
         String link = "http://localhost:8080/api/registration/confirm?token=" + token;
 
         emailSender.send(request.getEmail(), buildEmail(request.getFirstName(), link));
 
         return token;
     }

     public String registerAdmin(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
 
         if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
         }
 
         String token = appUserService.signUpUser(
             new AppUser(
                     request.getFirstName(),
                     request.getLastName(), 
                     request.getEmail(), 
                     request.getPassword(), 
                     AppUserRole.ADMIN
                     ),
                     null,
                     null,
                     null
         );
 
         String link = "http://localhost:8080/api/registration/confirm?token=" + token;
 
         emailSender.send(request.getEmail(), buildEmail(request.getFirstName(), link));
 
         return token;
     }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                                              .getToken(token)
                                              .orElseThrow(() ->
                                                new IllegalStateException("token not found"));
        
        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        if (confirmationToken.getAppUser().isEnabled()) {
            throw new IllegalStateException("account already verified");
        }

        confirmationTokenService.setConfirmed(token);
        appUserService.enableAppUser(
            confirmationToken.getAppUser().getEmail());
        createPatientDoctorOrAdminFromAppUser(confirmationToken);
        
        return confirmationMessage;
        
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    private final String confirmationMessage = new String(
                "<h1><span style=\"background-color: #000000;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; </span></h1>" +
                "<h1 style=\"color: #5e9ca0;\">Wyeryfikacja przebiegła pomyślnie</h1>" +
                "\n" +
                "<h2 style=\"text-align: left;\"><a href=\"http://localhost:3000/\">Przejdź do strony kliniki</a></h2>" +
                "<h1><span style=\"background-color: #000000;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; </span></h1>");

    public void createPatientDoctorOrAdminFromAppUser(ConfirmationToken confirmationToken) {
        AppUser appUser = confirmationToken.getAppUser();
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        if (userExists) {
            AppUserRole userRole = appUser.getAppUserRole();
            
            if (userRole.equals(AppUserRole.PATIENT)) {
                // Patient newPatient = new Patient(appUser.getFirstName(), appUser.getLastName(), appUser.getId());
                Patient newPatient = new Patient(appUser.getFirstName(),
                                                 appUser.getLastName(), 
                                                 confirmationToken.getDob(), 
                                                 confirmationToken.getPesel(), 
                                                 appUser.getId());
                patientService.addNewPatient(newPatient);
            }
            else if (userRole.equals(AppUserRole.DOCTOR)) {
                Doctor newDoctor = new Doctor(appUser.getFirstName(), 
                                              appUser.getLastName(), 
                                              confirmationToken.getDoctorSpecialisation(), 
                                              appUser.getId());
                doctorService.addNewDoctor(newDoctor);
            }
            else if (userRole.equals(AppUserRole.ADMIN)) {
                Admin newAdmin = new Admin(appUser.getFirstName(), 
                                           appUser.getLastName(), 
                                           appUser.getId());
                adminService.addNewAdmin(newAdmin);
            }
        } 
    }

    public String registerDoctorAsAdmin(RegistrationRequestDoctor request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
 
        if (!isValidEmail) {
           throw new IllegalStateException("email not valid");
        }

        String defaultPassword = new String("password");

        AppUser appUser = new AppUser(request.getFirstName(), request.getLastName(), request.getEmail(), defaultPassword, AppUserRole.DOCTOR);

        DoctorSpecialisation specialisation = request.getDoctorSpecialisation();
 
        String message = appUserService.signUpDoctor(appUser, specialisation);
        
        return message;
 
     }

     public String registerNewAdmin(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
 
        if (!isValidEmail) {
           throw new IllegalStateException("email not valid");
        }

        String defaultPassword = new String("password");

        AppUser appUser = new AppUser(request.getFirstName(), request.getLastName(), request.getEmail(), defaultPassword, AppUserRole.ADMIN);
 
        String message = appUserService.signUpAdmin(appUser);
        
        return message;
 
     }


    
}
