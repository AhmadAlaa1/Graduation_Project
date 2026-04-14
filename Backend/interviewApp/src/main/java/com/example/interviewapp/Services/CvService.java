package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface CvService {
    void sendCvToAnalysis(User user);
    CvAnalysisResponseDto returnCvAnalysis();
    CvAnalysisResponseDto reUploadCv(MultipartFile file);
}
