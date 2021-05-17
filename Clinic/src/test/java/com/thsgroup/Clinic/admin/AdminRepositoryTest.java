package com.thsgroup.Clinic.admin;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.thsgroup.Clinic.Admin.Admin;
import com.thsgroup.Clinic.Admin.AdminRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class AdminRepositoryTest {
    
    @Autowired
    private AdminRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfAdminExists() {

        // given
        Admin admin = new Admin("Michael", "Scott");
        underTest.save(admin);

        // when
        boolean exists = underTest.existsById(admin.getId());

        // then
        assertTrue(exists);
    }

    @Test
    void itShouldCheckIfAdminDoesNotExists() {

        // given
        Admin admin = new Admin("Michael", "Scott");
        underTest.save(admin);

        // when
        boolean exists = underTest.existsById(2L);

        // then
        assertFalse(exists);
    }

}
