package com.thsgroup.Clinic.registration.token;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.thsgroup.Clinic.Doctor.DoctorSpecialisation;
import com.thsgroup.Clinic.appuser.AppUser;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {
    
    @Id
    @SequenceGenerator(
        name = "confirmation_token_sequence",
        sequenceName = "confirmation_token_squence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "confirmation_token_sequence"
    )
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

    private String pesel;
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    private DoctorSpecialisation doctorSpecialisation;

    @ManyToOne
    @JoinColumn(
        nullable = false,
        name = "app_user_id"
    )
    private AppUser appUser;

    // admin token
    public ConfirmationToken(String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt,
                             AppUser appUser) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.confirmedAt = confirmedAt;
        this.appUser = appUser;
                                }
    
    // patient token
    public ConfirmationToken(String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt,
                             AppUser appUser, 
                             String pesel, 
                             LocalDate dob) {
           this.token = token;
           this.createdAt = createdAt;
           this.expiresAt = expiresAt;
           this.confirmedAt = confirmedAt;
           this.appUser = appUser;
           this.pesel = pesel;
           this.dob = dob;
                          }

    // doctor token
    public ConfirmationToken(String token,
                          LocalDateTime createdAt,
                          LocalDateTime expiresAt,
                          AppUser appUser, 
                          DoctorSpecialisation doctorSpecialisation) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.confirmedAt = confirmedAt;
        this.appUser = appUser;
        this.doctorSpecialisation = doctorSpecialisation;
                       }

    public ConfirmationToken(String token,
                       LocalDateTime createdAt,
                       LocalDateTime expiresAt,
                       AppUser appUser, 
                       String pesel, 
                       LocalDate dob, 
                       DoctorSpecialisation doctorSpecialisation) {
     this.token = token;
     this.createdAt = createdAt;
     this.expiresAt = expiresAt;
     this.confirmedAt = confirmedAt;
     this.appUser = appUser;
     this.pesel = pesel;
     this.dob = dob;
     this.doctorSpecialisation = doctorSpecialisation;
                    }
                                
}
