package com.thsgroup.Clinic.security.config;

import com.thsgroup.Clinic.appuser.AppUserService;
import com.thsgroup.Clinic.security.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// securedEnabled = true,
		// jsr250Enabled = true,
		prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    AppUserService appUserService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    public AuthTokenFilte



    @Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(appUserService).passwordEncoder(passwordEncoder.bCryptPasswordEncoder());
	}



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/registration/**", "/", "/login")
                .permitAll()
            .anyRequest().authenticated();

            // .and()
            // .httpBasic()
            // .and()
            // .formLogin()
            // .defaultSuccessUrl("/",false);
            
            
            // .usernameParameter("username") // default is username
            //      .passwordParameter("password") // default is password
            //      .loginPage("/authentication/login") // default is /login with an HTTP get
            //      .failureUrl("/authentication/login?failed") // default is /login?error
            //      .loginProcessingUrl("/authentication/login/process"); // default is /login
                                                                         // with an HTTP
                                                                         // post;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }
    
}
