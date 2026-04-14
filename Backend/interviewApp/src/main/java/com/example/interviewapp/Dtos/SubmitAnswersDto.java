package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class SubmitAnswersDto {

    private List<AnswerRequestDto> answers;

}