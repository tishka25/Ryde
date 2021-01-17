package com.ryde.server.controllers;

import com.ryde.server.entities.User;
import com.ryde.server.repositories.UserRepository;
import com.ryde.server.utility.CustomPSQLExceptionJSON;
import com.ryde.server.utility.EntityValidator;
import org.json.JSONObject;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final String ERROR_KEY = "error";
    private static final String REGISTER_ID_MSG = "User ID should not be provided on user registration.";
    private static final String INCORRECT_ID_MSG = "The request userId does not match the authorized one.";

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping
    public User getUserInfo(Principal principal) {
        return userRepository.findUserByEmail(principal.getName()).orElse(null);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Optional<String> errorJson = EntityValidator.validateEntity(user);

        if (errorJson.isPresent())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorJson.get());

        if (user.getId() != null)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, REGISTER_ID_MSG).toString());

        user.setVotes(0);
        user.setRating(new BigDecimal(0));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result;
        try {
            result = userRepository.save(user);
        } catch(DataIntegrityViolationException e) {
            PSQLException rootException = (PSQLException) e.getRootCause();
            String error = CustomPSQLExceptionJSON.buildCustomPSQLException(rootException);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }

        return ResponseEntity.ok(result.getId());
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(Principal principal, @RequestBody User user) {
        Optional<String> errorJson = EntityValidator.validateEntity(user);

        if (errorJson.isPresent())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorJson.get());

        User userPrincipal = userRepository.findUserByEmail(principal.getName()).orElse(null);

        if(user.getId() != userPrincipal.getId())
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, INCORRECT_ID_MSG));

        user.setVotes(userPrincipal.getVotes());
        user.setRating(userPrincipal.getRating());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result;
        try {
            result = userRepository.save(user);
        } catch(DataIntegrityViolationException e) {
            PSQLException rootException = (PSQLException) e.getRootCause();
            String error = CustomPSQLExceptionJSON.buildCustomPSQLException(rootException);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }

        return ResponseEntity.ok(result.getId());
    }
}
