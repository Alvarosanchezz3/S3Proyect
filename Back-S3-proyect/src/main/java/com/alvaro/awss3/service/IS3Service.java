package com.alvaro.awss3.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IS3Service {


    ResponseEntity uploadFile (MultipartFile file) throws IOException;

    ResponseEntity deleteFile (String fileName) throws IOException;

    byte[] downloadFileAsBytes(String fileName) throws IOException;
}
