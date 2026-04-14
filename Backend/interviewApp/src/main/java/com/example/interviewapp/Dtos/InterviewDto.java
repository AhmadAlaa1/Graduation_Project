package com.example.interviewapp.Dtos;

import com.example.interviewapp.Models.InterviewQuestion;
import com.example.interviewapp.Models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class InterviewDto {

    private UUID id;
}
