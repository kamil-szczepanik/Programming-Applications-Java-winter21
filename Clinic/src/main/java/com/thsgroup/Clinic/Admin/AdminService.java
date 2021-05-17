package com.thsgroup.Clinic.Admin;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdminService {
    
    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAdmins() {
		return adminRepository.findAll();
	}

    public Admin getAdminById(Long id) {
		return adminRepository.findById(id).orElse(null);
	}

    public void addNewAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    public void addNewAdmins(List<Admin> admins) {
        adminRepository.saveAll(admins);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public void updateAdmin(Admin admin){
        Admin existingAdmin = adminRepository.findById(admin.getId()).orElse(null);
        existingAdmin.setId(admin.getId());
        existingAdmin.setFirstName(admin.getFirstName());
        existingAdmin.setLastName(admin.getLastName());

        adminRepository.save(existingAdmin);

    }

    public boolean defaultFirstAdminExists() {
        return adminRepository.existsById(1L);
    }
}
