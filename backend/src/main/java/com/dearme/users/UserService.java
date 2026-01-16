package com.dearme.users;

import com.dearme.dtos.UserDataDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository repository;
    private PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public UserAccountDto save(UserDataDto regDto) {
        var passwordHash = encoder.encode(regDto.password());
        var newUserAcc = UserMapper.toUserAccount(regDto, passwordHash);
        UserAccount savedUserAcc;
        try {
            savedUserAcc = repository.save(newUserAcc);
        } catch (DataIntegrityViolationException ex) {
            boolean isUsernameTaken = repository.existsByUsername(regDto.username());
            boolean isEmailTaken = repository.existsByEmail(regDto.email());
            String err_code = "";
            
            if (isEmailTaken && isUsernameTaken) {
                err_code = "username_and_email_taken";
            }
            else if (isUsernameTaken) {
                err_code = "username_taken";
            }
            else if (isEmailTaken) {
                err_code = "email_taken";
            }
            throw new DataIntegrityViolationException(err_code);
        }
        
        return UserMapper.toUserAccountDto(savedUserAcc);
    }
    
    public UserAccountDto findUserById(Long id) {
        var userAcc = findUserAccountById(id);
        return UserMapper.toUserAccountDto(userAcc);
    }
    
    public UserAccountDto updateUser(UserDataDto updateDto,  Long id) {
        var userAcc = findUserAccountById(id);
        userAcc.setUsername(updateDto.username());
        userAcc.setEmail(updateDto.email());
        userAcc.setPwdHash(encoder.encode(updateDto.password()));
        return UserMapper.toUserAccountDto(userAcc);
    }
    
    public void deleteUserById(Long id) {
        var userAcc = findUserAccountById(id);
        repository.delete(userAcc);
    }
    
    public UserAccount findUserAccountById(Long id) throws EntityNotFoundException {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found."));
    }
}
