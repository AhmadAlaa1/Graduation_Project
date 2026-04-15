package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EvaluationRequestDto {
    private List<EvaluationItemDto> items = new ArrayList<>();
}