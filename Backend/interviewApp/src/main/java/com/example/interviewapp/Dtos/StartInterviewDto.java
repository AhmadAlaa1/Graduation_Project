package com.example.interviewapp.Dtos;

import lombok.*;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StartInterviewDto {
    private String role;
    private String level;
}
