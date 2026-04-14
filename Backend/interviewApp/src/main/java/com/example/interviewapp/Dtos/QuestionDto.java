package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class QuestionDto {
    private UUID questionID;
    private String questionText;
    private String questionAudio;
    private Integer orderNumber;

}