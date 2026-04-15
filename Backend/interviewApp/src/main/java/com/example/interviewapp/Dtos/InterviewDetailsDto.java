package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class InterviewDetailsDto {

    private UUID interviewId;
    private List<QuestionDetailsDto> questions = new ArrayList<>();
}