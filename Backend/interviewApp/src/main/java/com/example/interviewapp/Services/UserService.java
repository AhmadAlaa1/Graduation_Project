package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.InterviewListDto;
import com.example.interviewapp.Dtos.UserDto;
import com.example.interviewapp.Models.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserDto updateUser(UserDto dto, MultipartFile cvFile);

    void deleteMyAccount();
    UserDto userInfo();
    List<InterviewListDto> getUserInterviews();
}
