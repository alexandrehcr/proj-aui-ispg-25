package com.dearme.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record UserDataDto(
        @Pattern(regexp = "^[A-Za-z0-9]{2,30}$", 
                message = "username_pattern_mismatch") // Username must be 2–30 characters long and contain only letters and numbers"
        String username,
        
        @NotBlank @Email(message = "invalid_email_address")
        String email,
        
        @NotBlank @Length(min = 6, max = 30, message = "password_length")
        String password) {
}