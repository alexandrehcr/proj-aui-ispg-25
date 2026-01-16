package com.dearme.users;

public record UserAccountDto(
        Long id,
        String username,
        String email
) {
}
