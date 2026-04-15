package com.example.interviewapp.Dtos;

import com.example.interviewapp.Models.InterviewQuestion;
import com.example.interviewapp.Models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewListDto {

    private UUID id;
    private LocalDateTime createdAt;
    private Integer questionsCount;
}
