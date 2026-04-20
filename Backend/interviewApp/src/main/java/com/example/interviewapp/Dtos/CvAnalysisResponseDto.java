package com.example.interviewapp.Dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CvAnalysisResponseDto {

        private String name;
        private String title;
        private String summary;
        private String location;

        private ContactDto contact;
        private SkillsDto skills;

        private List<ProjectDto> projects = new ArrayList<>();
        private List<ExperienceDto> experience = new ArrayList<>();

        private List<EducationDto> education = new ArrayList<>();
        private AtsScoreDto ats_score;

        private List<String> suggested_interview_questions = new ArrayList<>();

}
