package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.AuthResponseDto;
import com.example.interviewapp.Dtos.LoginDto;
import com.example.interviewapp.Dtos.RegisterDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {
    AuthResponseDto signUp(RegisterDto registerDto, MultipartFile cvFile);

    AuthResponseDto signIn(LoginDto loginDto);

}