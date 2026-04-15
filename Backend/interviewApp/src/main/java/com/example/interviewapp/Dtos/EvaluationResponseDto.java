package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EvaluationResponseDto {
    private List<EvaluationDto> evaluations = new ArrayList<>();
}