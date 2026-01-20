package com.dearme.config;

import jakarta.servlet.http.HttpServletRequest;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Component
public class AppCorsConfigSource implements CorsConfigurationSource {

    @Override
    public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration corsCfg = new CorsConfiguration();
        corsCfg.setAllowedOrigins(List.of("http://localhost:3000"));
        corsCfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsCfg.setAllowedHeaders(List.of("*"));
        return corsCfg;
    }
}
