package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.AuthResponseDto;
import com.example.interviewapp.Dtos.LoginDto;
import com.example.interviewapp.Dtos.RegisterDto;
import com.example.interviewapp.Dtos.UserDto;
import com.example.interviewapp.Exceptions.DuplicateResourceException;
import com.example.interviewapp.Exceptions.ResourceNotFoundException;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Repositories.UserRepository;
import com.example.interviewapp.Services.AuthService;
import com.example.interviewapp.Services.CvService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JWTServiceImpl jwtService;
    private final PasswordEncoder passwordEncoder;
    private final CvService cvService;
    private final FileStorageService fileStorageService;


    @Override
    public AuthResponseDto signUp(RegisterDto registerDto, MultipartFile cvFile){

        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new DuplicateResourceException("Email is already registered");
        }
        String filePath = fileStorageService.saveCv(cvFile);
        User user = new User();
        user.setFirstName((registerDto.getFirstName()).toLowerCase());
        user.setLastName((registerDto.getLastName()).toLowerCase());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setPhone(registerDto.getPhone());
        user.setAge(registerDto.getAge());
        user.setNationality(registerDto.getNationality());
        user.setCity(registerDto.getCity());
        user.setCvFile(filePath);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        String token = jwtService.generateToken(user);

        UserDto userDto = UserDto.from(user);

        cvService.sendCvToAnalysis(user);
        return new AuthResponseDto("success", userDto,token);

    }

    public AuthResponseDto signIn(LoginDto loginDto){
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid credentials");

        }

        String token = jwtService.generateToken(user);

        UserDto userDto = UserDto.from(user);

        return new AuthResponseDto("success", userDto, token);

    }
}
