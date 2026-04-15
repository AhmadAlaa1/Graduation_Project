package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class QuestionDetailsDto {

    private UUID questionId;

    private String questionText;
    private String questionAudio;

    private String answerText;
    private String answerAudio;
    private EvaluationDto evaluationDto;

}
