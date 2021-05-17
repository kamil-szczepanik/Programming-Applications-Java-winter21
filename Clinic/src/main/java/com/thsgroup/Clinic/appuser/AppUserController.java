package com.thsgroup.Clinic.appuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/appUser")
public class AppUserController {
    private final AppUserService appUserService;


    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }
    
    @GetMapping
    public List<AppUser> getAppUsers() {
        return appUserService.getAppUsers();
    }

    @GetMapping("{id}")
    public AppUser findAppUserById(@PathVariable Long id) {
        return appUserService.getAppUserById(id);
    }

    // @PutMapping("update")
    // public void updateAppUser(@RequestBody AppUser appUser) {
    //     appUserService.updateAppUser(doctor);
    // }

    @DeleteMapping("delete/{id}")
    public void deleteAppUser(@PathVariable Long id) {
        appUserService.deleteAppUser(id);
    }

    @ResponseBody
    @GetMapping("/getInfoAboutLoggedAppUser")
    public AppUser getInfoAboutLoggedAppUser() {
        AppUser appUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUser;
    }

    @ResponseBody
    @GetMapping("/getEmailOfLoggedAppUser")
    public String getEmailOfLoggedAppUser() {
        AppUser appUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUser.getEmail();
    }
}