package com.example.demo.Config;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.AuthService;
import com.example.demo.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.example.demo.util.Util.getUserByToken;


@RequiredArgsConstructor
@Configuration
public class CustomLogoutHandler implements LogoutHandler {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
       User user = getUserByToken(request, jwtService, userRepository);
        authService.revokeAllUserTokens(user);
    }
}
