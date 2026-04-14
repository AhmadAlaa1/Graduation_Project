package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@RequestMapping("/mock-ai")
public class MockAiController {

    @GetMapping("/cv-analysis/default")
    public CvAnalysisResponseDto mockResult() {

        CvAnalysisResponseDto dto = new CvAnalysisResponseDto();

        // ===== Basic Info =====
        dto.setName("Aya Ahmed");
        dto.setTitle("Frontend Developer");
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

    @PostMapping("/interview/questions")
    public InterviewQuestionsResponseDto getQuestions(@RequestParam("file") MultipartFile file) {

        InterviewQuestionsResponseDto response = new InterviewQuestionsResponseDto();

        QuestionDto q1 = new QuestionDto();
        q1.setQuestionText("Tell me about yourself");
        q1.setQuestionAudio("audio1.mp3");
        q1.setOrderNumber(1);

        QuestionDto q2 = new QuestionDto();
        q2.setQuestionText("What is OOP?");
        q2.setQuestionAudio("audio2.mp3");
        q2.setOrderNumber(2);

        QuestionDto q3 = new QuestionDto();
        q3.setQuestionText("Explain REST API");
        q3.setQuestionAudio("audio3.mp3");
        q3.setOrderNumber(3);

        response.getQuestions().add(q1);
        response.getQuestions().add(q2);
        response.getQuestions().add(q3);

        return response;
    }
}