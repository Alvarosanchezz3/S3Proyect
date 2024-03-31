package com.alvaro.awss3.controller;

import com.alvaro.awss3.dto.LoginRequest;
import com.alvaro.awss3.dto.RegisterRequest;
import com.alvaro.awss3.entity.User;
import com.alvaro.awss3.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RequestMapping("/users")
@RestController
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping
    public ResponseEntity listUsers () {
        return ResponseEntity.ok(userService.findAllByRoleUser());
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity getUserByUsername (@PathVariable String username) {
        return ResponseEntity.ok(userService.findUserByUsername(username));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        User user = userService.login(loginRequest);
        if (user != null) {
            // Autenticación exitosa, devolver información del usuario
            if (user.getRole().equals("ROLE_USER")) {
                // Si el usuario no es administrador, devolver estado de prohibido (403)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } else {
                // Si el usuario es administrador, devolver información del usuario
                return ResponseEntity.ok(user);
            }
        } else {
            // Autenticación fallida
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> createOne(@RequestBody @Valid RegisterRequest registerRequest) {
        User user = userService.createOne(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateOne(@PathVariable Long userId, @RequestBody User user) {
        User updatedUser = userService.updateOne(userId, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteOneById (@PathVariable Long userId) {

        Optional<User> apartment = userService.findOneById(userId);

        if (apartment.isPresent()) {
            userService.deleteOneById(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("El usuario con Id " + userId + " fue borrado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario con Id " + userId + " no fue encontrado.");
        }
    }
}