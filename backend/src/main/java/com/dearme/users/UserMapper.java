package com.dearme.users;

import com.dearme.dtos.UserDataDto;

public class UserMapper {
    private UserMapper() {
    }
    
    public static UserAccount toUserAccount(UserDataDto dto, String passwordHash) {
        return new UserAccount(dto.username(), dto.email(), passwordHash);
    }
    
    public static UserAccountDto toUserAccountDto(UserAccount acc) {
        return new UserAccountDto(acc.getId(), acc.getUsername(), acc.getEmail());
    }
}
