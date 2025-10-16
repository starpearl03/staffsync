package com.example.demo.services;

import com.example.demo.model.Employee;
import com.example.demo.model.Token;
import com.example.demo.model.TokenType;
import com.example.demo.model.User;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.requestResponse.AuthenticateRequest;
import com.example.demo.requestResponse.AuthenticationResponse;
import com.example.demo.requestResponse.LoggedUserResponse;
import com.example.demo.requestResponse.RegisterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Optional;

import static com.example.demo.util.Util.getUserByToken;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmployeeService employeeService;

    private void saveUserToken(User user, String jwtToken, TokenType type) {
        var token = Token
                .builder()
                .user(user)
                .token(jwtToken)
                .tokenType(type)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public void revokeAllUserTokens(User user){
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserTokens.isEmpty()) return;

        validUserTokens.forEach(token ->{
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var userEmail = userRepository.findByEmail(request.getEmail());
        if(userEmail.isPresent()){throw new RuntimeException("User email already exists");}

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser, jwtToken, TokenType.ACCESS);
        saveUserToken(savedUser, refreshToken, TokenType.REFRESH);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(), savedUser.getPassword()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public LoggedUserResponse fetchLoggedInUserByToken(
            HttpServletRequest request
    ){
        User user = getUserByToken(request, jwtService, this.userRepository);
        return LoggedUserResponse.builder()
                .role(user.getRole())
                .email(user.getEmail())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request){

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new EntityNotFoundException("User email does not exist"));

        if(passwordEncoder.matches(request.getPassword(), user.getPassword())){

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            revokeAllUserTokens(user);
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            saveUserToken(user, jwtToken, TokenType.ACCESS);
            saveUserToken(user, refreshToken, TokenType.REFRESH);

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        }
        throw new RuntimeException("Incorrect password");
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }

        refreshToken = authHeader.split(" ")[1].trim();
        userEmail = jwtService.extractUsername(refreshToken);

        if(userEmail != null){
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Please enter valid token"));

            var isTokenValid = tokenRepository.findByToken(refreshToken)
                    .map(token -> !token.getRevoked() && !token.getExpired() && token.getTokenType().equals(TokenType.REFRESH))
                    .orElse(false);

            if(jwtService.isTokenValid(refreshToken, user) && isTokenValid){
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken, TokenType.ACCESS);
                saveUserToken(user, refreshToken, TokenType.REFRESH);

                var authResponse = AuthenticationResponse
                        .builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }

            throw new RuntimeException("Please enter valid refresh token");
        }
    }

    public Boolean isAuthenticated(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Boolean.FALSE;
        }

        String jwtToken = authHeader.split(" ")[1].trim();
        String userEmail = this.jwtService.extractUsername(jwtToken);

        Optional<User> userOptional = this.userRepository.findByEmail(userEmail);

        // Check if the user exists and token is valid
        if (userOptional.isPresent() && this.jwtService.isTokenValid(jwtToken, userOptional.get())) {

            Optional<Token> tokenOptional = tokenRepository.findByToken(jwtToken);

            if (tokenOptional.isPresent()) {
                Token token = tokenOptional.get();
                if (!token.getRevoked() && !token.getExpired()) {
                    return Boolean.TRUE; // Token is valid
                }
            }
        }

        return Boolean.FALSE; // Token is either revoked, expired, or not found
    }

    public Employee loggedInEmployee(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Enter valid token");
        }

        String jwtToken = authHeader.split(" ")[1].trim();
        String userEmail = this.jwtService.extractUsername(jwtToken);


        return this.employeeService.findEmployeeByEmail(userEmail);
    }

}
