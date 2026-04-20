package com.example.interviewapp.External.Ai;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Models.User;
import org.springframework.security.core.Authentication;

public interface CvAnalysisClient {
     CvAnalysisResponseDto analyzeCvAsPdf(String filePath);
}
