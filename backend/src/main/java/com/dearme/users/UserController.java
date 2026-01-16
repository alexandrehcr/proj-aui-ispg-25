package com.dearme.users;

import com.dearme.dtos.UserDataDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    
    private UserService service;
    
    @Autowired
    public void setService(UserService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<UserAccountDto> saveUser(@Valid @RequestBody UserDataDto userDataDto) {
        UserAccountDto savedAcc = service.save(userDataDto);
        return new ResponseEntity<>(savedAcc, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserAccountDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(service.findUserById(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserAccountDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserDataDto userDataDto) {
        return ResponseEntity.ok(service.updateUser(userDataDto, id));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        service.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
}
