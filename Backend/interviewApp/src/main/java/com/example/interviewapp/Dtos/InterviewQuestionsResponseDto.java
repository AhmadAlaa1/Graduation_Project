package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class InterviewQuestionsResponseDto {
    private UUID interviewId;
    private List<String> questions = new ArrayList<>();
    private List<QuestionDto> mappedQuestions = new ArrayList<>();

}