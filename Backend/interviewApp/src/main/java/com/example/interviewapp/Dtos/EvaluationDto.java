package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class EvaluationDto {

    private float score;
    private List<String> strengths;
    private List<String> gaps;

    @JsonProperty("better_answer")
    private String betterAnswer;

    @JsonProperty("followup_question")
    private String followupQuestion;

    private String feedback;
}
