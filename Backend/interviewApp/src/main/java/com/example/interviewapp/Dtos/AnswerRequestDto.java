package com.example.interviewapp.Dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
public class AnswerRequestDto {

    private UUID questionId;

    private String answerText;

    private MultipartFile answerAudio;

}