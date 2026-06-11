package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Exceptions.FileUploadServiceException;
import com.example.interviewapp.Exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    public String saveCv(MultipartFile file) {
        try {
            String uploadDir = "uploads/cv/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return path.toString();
        } catch (IOException e) {
            throw new FileUploadServiceException("Failed to upload CV");

        }
    }

    public String saveAudio(MultipartFile file) {
        try {
            String uploadDir = "uploads/answers/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return path.toString();
        } catch (IOException e) {
            throw new FileUploadServiceException("Failed to upload audio");
        }
    }
}