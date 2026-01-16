package com.dearme;

import com.dearme.dtos.ApiError;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ApiExHandler {
    
    @ExceptionHandler
    public ResponseEntity<List<ApiError>> handleMethodArgumentNotValidException(MethodArgumentNotValidException validationException) {
        List<ApiError> errors = new ArrayList<>();
        validationException.getBindingResult().getAllErrors().forEach((error) -> errors.add(new ApiError(error.getDefaultMessage())));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ApiError> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return new ResponseEntity<>(new ApiError(ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ApiError> handleEntityNotFoundException(EntityNotFoundException entityNotFoundException) {
        return new ResponseEntity<>(new ApiError(entityNotFoundException.getMessage()),
                HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler
    public ResponseEntity<ApiError> handleOtherExceptions(Exception ex) {
        return new ResponseEntity<>(new ApiError(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
