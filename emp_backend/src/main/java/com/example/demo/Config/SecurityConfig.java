package com.example.demo.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.example.demo.model.Permission.*;
import static com.example.demo.model.Role.ADMIN;
import static com.example.demo.model.Role.EMPLOYEE;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final CustomLogoutHandler logoutHandler;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize)->authorize
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // Admin endpoints
                        .requestMatchers("/api/v1/employees/**").hasRole(ADMIN.name())
                        .requestMatchers("/api/v1/leave/**").hasRole(ADMIN.name())
                        .requestMatchers("/api/v1/notification/**").hasRole(ADMIN.name())
                        .requestMatchers("/api/v1/project/**").hasRole(ADMIN.name())
                        .requestMatchers("/api/v1/report/**").hasRole(ADMIN.name())
                        .requestMatchers("/api/v1/task/**").hasRole(ADMIN.name())

                        // Employee endpoints
                        .requestMatchers("/api/v1/leave/**").hasAnyRole(EMPLOYEE.name())
                        .requestMatchers("/api/v1/employees/**").hasAnyRole(EMPLOYEE.name())
                        .requestMatchers("/api/v1/notification/**").hasAnyRole(EMPLOYEE.name())
                        .requestMatchers("/api/v1/task/**").hasAnyRole(EMPLOYEE.name())

                        // Specific methods for admin and employee roles
                        .requestMatchers(GET,"/api/v1/employees/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/employees/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/employees/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/employees/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/leave/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/leave/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/leave/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/leave/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/notification/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/notification/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/notification/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/notification/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/project/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/project/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/project/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/project/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/report/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/report/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/report/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/report/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/task/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST,"/api/v1/task/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/task/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE,"/api/v1/task/**").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers(GET,"/api/v1/leave/**").hasAnyAuthority(EMPLOYEE_READ.name())
                        .requestMatchers(POST,"/api/v1/leave/**").hasAnyAuthority(EMPLOYEE_CREATE.name())
                        .requestMatchers(PUT,"/api/v1/leave/**").hasAnyAuthority(EMPLOYEE_UPDATE.name())

                        .requestMatchers(GET,"/api/v1/employees/**").hasAnyAuthority(EMPLOYEE_READ.name())
                        .requestMatchers(PUT,"/api/v1/employees/**").hasAnyAuthority(EMPLOYEE_UPDATE.name())

                        .requestMatchers(GET,"/api/v1/notification/**").hasAnyAuthority(EMPLOYEE_READ.name())
                        .requestMatchers(POST,"/api/v1/notification/**").hasAnyAuthority(EMPLOYEE_CREATE.name())

                        .requestMatchers(GET,"/api/v1/task/**").hasAnyAuthority(EMPLOYEE_READ.name())
                        .requestMatchers(PUT,"/api/v1/task/**").hasAnyAuthority(EMPLOYEE_UPDATE.name())

                        .anyRequest().authenticated()
                )
                .sessionManagement((session)->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout((logout) -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((
                                (request, response, authentication) ->
                                        SecurityContextHolder.clearContext()
                        ))
                );
        return http.build();
    }
}
