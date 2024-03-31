package com.alvaro.awss3.service.impl;

import com.alvaro.awss3.dto.LoginRequest;
import com.alvaro.awss3.dto.RegisterRequest;
import com.alvaro.awss3.entity.User;
import com.alvaro.awss3.repository.UserRepository;
import com.alvaro.awss3.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAllByRoleUser() {
        return userRepository.findByRole("ROLE_USER");
    }

    @Override
    public Optional<User> findOneById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User createOne(RegisterRequest registerRequest) {
        User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(registerRequest.getPassword());
            user.setName(registerRequest.getName());
            user.setAge(registerRequest.getAge());
            user.setEmail(registerRequest.getEmail());
            user.setRole("ROLE_USER");
        return userRepository.save(user);
    }

    @Override
    public User login(LoginRequest loginRequest) {
        // Buscar al usuario por su nombre de usuario en la base de datos
        User user = userRepository.findByUsername(loginRequest.getUsername());

        // Verificar si el usuario existe y si la contraseña coincide
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // Las credenciales son válidas, devolver el objeto User
            return user;
        }
        // Las credenciales no son válidas, devolver null
        return null;
    }

    @Override
    public User updateOne(Long userId, User user) {
        return userRepository.findById(userId).map(userToUpdate -> {
            if (user.getName() != null) userToUpdate.setName(user.getName());
            if (user.getAge() != 0) userToUpdate.setAge(user.getAge());
            if (user.getEmail() != null) userToUpdate.setEmail(user.getEmail());

            return userRepository.save(userToUpdate);
        }).orElse(null);
    }

    @Override
    public void deleteOneById(Long id) {
        userRepository.deleteById(id);
    }
}