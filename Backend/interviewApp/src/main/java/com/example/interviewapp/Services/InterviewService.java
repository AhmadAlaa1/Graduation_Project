package com.example.interviewapp.Services;

import com.example.interviewapp.Dtos.InterviewDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.Dtos.SubmitAnswersDto;
import com.example.interviewapp.Models.Interview;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface InterviewService {
    InterviewDto startInterview();

    InterviewQuestionsResponseDto generateInterviewQuestions(UUID interID);

    void submitAnswers(UUID interviewId, SubmitAnswersDto dto);
}
