package com.thsgroup.Clinic.security;

import java.util.List;
import java.util.stream.Collectors;

import com.thsgroup.Clinic.appuser.AppUser;
import com.thsgroup.Clinic.appuser.AppUserRepository;
import com.thsgroup.Clinic.appuser.AppUserService;
import com.thsgroup.Clinic.appuser.RoleRepository;
import com.thsgroup.Clinic.payload.request.ChangePasswordRequest;
import com.thsgroup.Clinic.payload.request.LoginRequest;
import com.thsgroup.Clinic.payload.response.JwtResponse;
import com.thsgroup.Clinic.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

    @Autowired
	JwtUtils jwtUtils;

	@Autowired
	private AppUserService appUserService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		AppUser userDetails = (AppUser) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}


	@PostMapping("/changePassword")
	public String changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {

		AppUser appUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(appUser.getEmail(), changePasswordRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String encodedPassword = encoder.encode(changePasswordRequest.getNewPassword());

        appUser.setPassword(encodedPassword);

		appUserService.updateAppUser(appUser);
		

		return "Password changed successfully";

					
	}

}