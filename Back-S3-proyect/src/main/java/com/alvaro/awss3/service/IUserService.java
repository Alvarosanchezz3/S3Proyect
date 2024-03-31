package com.alvaro.awss3.service;

import com.alvaro.awss3.dto.LoginRequest;
import com.alvaro.awss3.dto.RegisterRequest;
import com.alvaro.awss3.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> findAllByRoleUser ();

    Optional<User> findOneById(Long id);

    User findUserByUsername(String username);

    User createOne(RegisterRequest registerRequest);

    User login(LoginRequest loginRequest);

    User updateOne(Long userId, User user);

    void deleteOneById (Long id);
}
