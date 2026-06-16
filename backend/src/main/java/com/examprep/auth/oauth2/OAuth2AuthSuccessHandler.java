package com.examprep.auth.oauth2;

import com.examprep.auth.JwtService;
import com.examprep.auth.RefreshToken;
import com.examprep.auth.RefreshTokenRepository;
import com.examprep.user.Role;
import com.examprep.user.User;
import com.examprep.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name  = oAuth2User.getAttribute("name");

        // Find or create user
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .password("") // no password for OAuth users
                    .role(Role.STUDENT)
                    .enabled(true)
                    .build();
            return userRepository.save(newUser);
        });

        // Issue tokens
        String accessToken = jwtService.generateAccessToken(
                user, user.getId().toString(), user.getRole().name()
        );
        String refreshToken = jwtService.generateRefreshToken(user);

        // Persist refresh token
        RefreshToken storedRefresh = RefreshToken.builder()
                .token(refreshToken)
                .user(user)
                .expiresAt(LocalDateTime.now().plusSeconds(
                        jwtService.getRefreshExpirationMs() / 1000
                ))
                .revoked(false)
                .build();
        refreshTokenRepository.save(storedRefresh);

        // Redirect to frontend with tokens
        String redirectUrl = frontendUrl + "/oauth2/redirect"
                + "?token=" + accessToken
                + "&refreshToken=" + refreshToken;

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}