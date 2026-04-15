package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class EvaluationDto {

    private float score;

    private List<String> strengths;
    private List<String> gaps;

    private String betterAnswer;
    private String followupQuestion;
    private String feedback;
}
