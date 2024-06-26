package com.alvaro.awss3.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ApiError implements Serializable {

    private String backendMessage;

    private String message;

    private String url;

    private String method;

    private LocalDateTime timestamp;
}
