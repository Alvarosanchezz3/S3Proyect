package com.alvaro.awss3.controller;

import com.alvaro.awss3.service.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("http://localhost:4200")
@RequestMapping("/s3")
@RestController
public class S3Controller {

    @Autowired
    private IS3Service s3Service;

    @GetMapping("/downloadAsBytes/{fileName}")
    public ResponseEntity<byte[]> downloadFileAsBytes(@PathVariable String fileName) throws IOException {
        byte[] fileBytes = s3Service.downloadFileAsBytes(fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        return ResponseEntity.ok().headers(headers).body(fileBytes);
    }

    @PostMapping("/upload")
    public ResponseEntity uploadFile (@RequestParam("file") MultipartFile file) throws IOException {
        return s3Service.uploadFile(file);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity deleteFile (@PathVariable String fileName) throws IOException {
        return s3Service.deleteFile(fileName);
    }
}