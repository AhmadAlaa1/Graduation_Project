package com.example.interviewapp.External.Ai;

import com.example.interviewapp.Dtos.EvaluationRequestDto;
import com.example.interviewapp.Dtos.EvaluationResponseDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.Models.CvAnalysis;

public interface InterviewClient {
    InterviewQuestionsResponseDto getInterviewQuestions(CvAnalysis cvAnalysis);
    EvaluationResponseDto evaluate(EvaluationRequestDto request);
}
