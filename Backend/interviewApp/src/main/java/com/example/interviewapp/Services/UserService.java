package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.UserDto;
import com.example.interviewapp.Models.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserDto updateUser(UserDto dto, MultipartFile cvFile);

    void deleteMyAccount();
}
