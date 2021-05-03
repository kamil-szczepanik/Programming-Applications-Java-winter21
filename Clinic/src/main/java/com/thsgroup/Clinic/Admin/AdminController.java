package com.thsgroup.Clinic.Admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


// @RequestMapping(path = "api/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("api/admin")
	public List<Admin> getAdmins() {
        return adminService.getAdmins();
    }

    @GetMapping("api/admin/{id}")
    public Admin findAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }

    @PostMapping("api/admin/registerNewAdmin")
    public void registerNewAdmin(@RequestBody Admin admin) {
        adminService.addNewAdmin(admin);
    }

    @PostMapping("api/admin/addAdmins")
    public void registerNewAdmins(@RequestBody List<Admin> admins) {
        adminService.addNewAdmins(admins);
    }

    @PutMapping("api/admin/update")
    public void updateAdmin(@RequestBody Admin admin) {
        adminService.updateAdmin(admin);
    }

    @DeleteMapping("api/admin/delete/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }





}
