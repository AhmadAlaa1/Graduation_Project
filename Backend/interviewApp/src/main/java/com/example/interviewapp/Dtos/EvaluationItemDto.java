package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EvaluationItemDto {
    private String question;
    @JsonProperty("answer_text")
    private String answer_text;
}