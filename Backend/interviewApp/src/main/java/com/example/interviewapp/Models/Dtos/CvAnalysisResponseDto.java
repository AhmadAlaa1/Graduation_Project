package com.example.interviewapp.Models.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class CvAnalysisResponseDto {

        private String name;
        private String title;
        private String summary;

        private String skills;

        private List<ProjectDto> projects=new ArrayList<>();
        private List<ExperienceDto> experience=new ArrayList<>();

}
