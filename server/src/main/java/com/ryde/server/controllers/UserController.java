package com.ryde.server.controllers;

import com.ryde.server.entities.User;
import com.ryde.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public User getUserById(@RequestHeader Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> result = userRepository.findUserByEmailAndPassword(user.getEmail(), user.getPassword());

        return result.isPresent() ? ResponseEntity.ok(result.get().getId()) : ResponseEntity.ok("Wrong email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User result = userRepository.save(user);

        return ResponseEntity.ok(result.getId());
    }
}
