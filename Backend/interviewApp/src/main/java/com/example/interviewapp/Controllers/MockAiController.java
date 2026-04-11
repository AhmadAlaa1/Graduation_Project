package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Dtos.ExperienceDto;
import com.example.interviewapp.Dtos.ProjectDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/mock-ai")
public class MockAiController {

    @GetMapping("/cv-analysis/default")
    public CvAnalysisResponseDto mockResult() {

        CvAnalysisResponseDto dto = new CvAnalysisResponseDto();

        // ===== Basic Info =====
        dto.setName("Ahmed Mohamed");
        dto.setTitle("Backend Developer");
        dto.setSummary("Backend developer with strong experience in Java, Spring Boot, and REST APIs. Passionate about scalable systems and clean architecture.");

        dto.setSkills("Java, Spring Boot, Hibernate, MySQL, REST APIs, Docker");

        // ===== Projects =====
        ProjectDto p1 = new ProjectDto();
        p1.setName("E-Commerce System");
        p1.setDescription("Full backend system for online store with payment integration and order management.");
        p1.setTechStack("Spring Boot, MySQL, JWT");

        ProjectDto p2 = new ProjectDto();
        p2.setName("Interview Platform");
        p2.setDescription("Platform for managing interviews and CV analysis using AI integration.");
        p2.setTechStack("Spring Boot, REST API, React");

        dto.getProjects().add(p1);
        dto.getProjects().add(p2);

        // ===== Experience =====
        ExperienceDto e1 = new ExperienceDto();
        e1.setCompany("Tech Company A");
        e1.setTitle("Backend Intern");
        e1.setStartDate(LocalDate.of(2024, 1, 1));
        e1.setEndDate(LocalDate.of(2024, 6, 1));
        e1.setDescription("Worked on REST APIs and database optimization.");

        ExperienceDto e2 = new ExperienceDto();
        e2.setCompany("Startup B");
        e2.setTitle("Junior Backend Developer");
        e2.setStartDate(LocalDate.of(2024, 7, 1));
        e2.setEndDate(LocalDate.of(2025, 1, 1));
        e2.setDescription("Built microservices and integrated third-party APIs.");

        dto.getExperience().add(e1);
        dto.getExperience().add(e2);

        return dto;
    }
}