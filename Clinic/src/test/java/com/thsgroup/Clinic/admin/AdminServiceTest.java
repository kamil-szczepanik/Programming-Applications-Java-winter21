package com.thsgroup.Clinic.admin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import com.thsgroup.Clinic.Admin.Admin;
import com.thsgroup.Clinic.Admin.AdminRepository;
import com.thsgroup.Clinic.Admin.AdminService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;
    private AdminService underTest;

    @BeforeEach
    void setUp() {
        underTest = new AdminService(adminRepository)  ; 
    }
    
    @Test
    void canGetAdmins() {
        // when
        underTest.getAdmins();
        // then
        verify(adminRepository).findAll();
    }

    @Test
    void canAddNewAdmin() {
        // given
        Admin admin = new Admin("Michael", "Scott");
        // when
        underTest.addNewAdmin(admin);
        // then
        ArgumentCaptor<Admin> adminArgumentCaptor = ArgumentCaptor.forClass(Admin.class);

        verify(adminRepository).save(adminArgumentCaptor.capture());

        Admin capturedAdmin = adminArgumentCaptor.getValue();

        assertEquals(capturedAdmin, admin);
    }
}
