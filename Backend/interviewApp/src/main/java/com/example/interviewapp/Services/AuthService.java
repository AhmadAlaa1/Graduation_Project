package com.example.interviewapp.Services;

import com.example.interviewapp.Models.Dtos.AuthResponseDto;
import com.example.interviewapp.Models.Dtos.LoginDto;
import com.example.interviewapp.Models.Dtos.RegisterDto;
import com.example.interviewapp.Models.Dtos.UserDto;
import com.example.interviewapp.Models.Entities.User;
import com.example.interviewapp.Repositories.UserRepository;
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
public class AuthService {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponseDto signUp(RegisterDto registerDto, MultipartFile cvFile){
        String filePath = saveCv(cvFile);

        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new RuntimeException("Email is already registered");
        }
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

        UserDto userDto = new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getAge(),
                user.getNationality(),
                user.getCity(),
                user.getCvFile());
        return new AuthResponseDto("success", userDto, token);

    }
    private String saveCv(MultipartFile file) {

        try {

            String uploadDir = "uploads/cv/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return path.toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload CV");
        }
    }
    public AuthResponseDto signIn(LoginDto loginDto){
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        UserDto userDto = new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getAge(),
                user.getNationality(),
                user.getCity(),
                user.getCvFile());
        return new AuthResponseDto("success", userDto, token);
    }
}
