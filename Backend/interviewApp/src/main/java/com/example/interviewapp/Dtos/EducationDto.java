package com.example.interviewapp.Dtos;

import com.example.interviewapp.Models.CvAnalysis;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class EducationDto {


    private CvAnalysis cv;

    private String degree;

    private String institution;

    private String status;
}
