package com.thsgroup.Clinic.appuser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import com.thsgroup.Clinic.Admin.AdminService;
import com.thsgroup.Clinic.Doctor.DoctorService;
import com.thsgroup.Clinic.registration.token.ConfirmationTokenService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AppUserServiceTest {

    @Mock
    private AppUserRepository appUserRepository;
    private AppUserService underTest;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private ConfirmationTokenService confirmationTokenService;
    private DoctorService doctorService;
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        underTest = new AppUserService(appUserRepository, bCryptPasswordEncoder, confirmationTokenService, doctorService, adminService); 
    }
    
    @Test
    void canGetAppUsers() {
        // when
        underTest.getAppUsers();
        // then
        verify(appUserRepository).findAll();
    }

    @Test
    void canAddNewAppUser() {
        // given
        AppUser appUser = new AppUser("Michael", "Scott", "michael.scott@gmail.com", "password", AppUserRole.PATIENT);
        // when
        underTest.addNewAppUser(appUser);
        // then
        ArgumentCaptor<AppUser> appUserArgumentCaptor = ArgumentCaptor.forClass(AppUser.class);

        verify(appUserRepository).save(appUserArgumentCaptor.capture());

        AppUser capturedAppUser = appUserArgumentCaptor.getValue();

        assertEquals(capturedAppUser, appUser);
    }

    // @Test
    // void canCheckIfAttributesAreTheSame() {
    //     // given
    //     AppUser appUser = new AppUser("Michael", "Scott", "michael.scott@gmail.com", "password", AppUserRole.PATIENT);
    //     // when
    //     appUserRepository.save(appUser);
    //     // underTest.addNewAppUser(appUser);

    //     assertTrue(underTest.checkIfAttributesAreTheSame(appUser));
    // }

    // @Test
    // void canSignUpDoctor() {
    //     // given
    //     AppUser appUser = new AppUser("Michael", "Scott", "michael.scott@gmail.com", "password", AppUserRole.PATIENT);
        
    //     // when
    //     // then
        
    //     String message = underTest.signUpDoctor(appUser, DoctorSpecialisation.CHIRURGIA);

    // }

    // // @Test
    // // void canSignUpDoctor() {
    // //     // given
    // //     AppUser appUser = new AppUser("Michael", "Scott", "michael.scott@gmail.com", "password", AppUserRole.PATIENT);
        
    // //     BDDMockito.given(appUserRepository.findByEmail(anyString()).isPresent()).willReturn(true);
    // //     // when
    // //     // then
    // //     Exception exception = assertThrows(IllegalStateException.class , () -> {
    // //         underTest.signUpDoctor(appUser, DoctorSpecialisation.CHIRURGIA);
    // //     });

    // //     String expectedMessage = "email already taken";
    // //     String actualMessage = exception.getMessage();

    // //     assertTrue(actualMessage.contains(expectedMessage));

    // // }
}
