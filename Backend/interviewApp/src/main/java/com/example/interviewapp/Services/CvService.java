package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface CvService {
    void sendCvToAnalysis(User user);
}
