package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CvAnalysisResponseDto {

        private String name;
        private String title;
        private String summary;

        private String skills;

        private List<ProjectDto> projects=new ArrayList<>();
        private List<ExperienceDto> experience=new ArrayList<>();

}
