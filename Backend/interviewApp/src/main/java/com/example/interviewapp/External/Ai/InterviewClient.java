package com.example.interviewapp.External.Ai;

import com.example.interviewapp.Dtos.EvaluationRequestDto;
import com.example.interviewapp.Dtos.EvaluationResponseDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;

public interface InterviewClient {
    InterviewQuestionsResponseDto getInterviewQuestions(String filePath);
    InterviewQuestionsResponseDto getInterviewQuestionsWithoutpdf();
    EvaluationResponseDto evaluate(EvaluationRequestDto request);
}
