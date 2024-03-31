package com.alvaro.awss3.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;

@Data
public class LoginRequest implements Serializable {

    @NotBlank
    @Size(min = 4)
    private String username;

    @NotBlank 
    @Size(min = 8)
    private String password;
}