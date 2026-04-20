package com.example.interviewapp.Dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewPlanRequestDto {

    private String role;
    private String level;
    private int total_q;
    private Object cv_analysis;
    private int session_seed;
}