package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Dtos.ExperienceDto;
import com.example.interviewapp.Dtos.ProjectDto;
import com.example.interviewapp.External.Ai.Impl.CvAnalysisClientImpl;
import com.example.interviewapp.Models.CvAnalysis;
import com.example.interviewapp.Models.CvExperience;
import com.example.interviewapp.Models.CvProject;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Repositories.CvAnalysisRepository;
import com.example.interviewapp.Repositories.ExperienceRepository;
import com.example.interviewapp.Repositories.ProjectRepository;
import com.example.interviewapp.Repositories.UserRepository;
import com.example.interviewapp.Services.CvService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor

public class CvServiceImpl implements CvService {
    private final UserRepository userRepository;
    private final CvAnalysisClientImpl cvAnalysisClientImpl;
    private final CvAnalysisRepository cvAnalysisRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final JWTServiceImpl jwtService;


    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void sendCvToAnalysis(User dto) {
        var user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<CvAnalysis> existing = cvAnalysisRepository.findByUser(user);
        existing.ifPresent(oldCv -> {
            cvAnalysisRepository.delete(oldCv);
        });
        CvAnalysis cv = new CvAnalysis();

        String cvPath = user.getCvFile();
        cvAnalysisClientImpl.analyzeCvAsPdf(cvPath);
        CvAnalysisResponseDto response = cvAnalysisClientImpl.analysisResult();
        cv.setUser(user);
        cv.setName(response.getName());
        cv.setTitle(response.getTitle());
        cv.setSummary(response.getSummary());
        cv.setCreatedAt(LocalDateTime.now());

        cv.setSkills(response.getSkills());

        cvAnalysisRepository.save(cv);
        response.getProjects().forEach(p -> {
            CvProject project = new CvProject();

            project.setCv(cv);
            project.setName(p.getName());
            project.setDescription(p.getDescription());
            project.setTechStack(p.getTechStack());

            projectRepository.save(project);
        });

        response.getExperience().forEach(exp -> {

            CvExperience experience = new CvExperience();

            experience.setCv(cv);
            experience.setCompany(exp.getCompany());
            experience.setTitle(exp.getTitle());
            experience.setDescription(exp.getDescription());

            experienceRepository.save(experience);
        });
    }
    @Override
    public CvAnalysisResponseDto returnCvAnalysis() {
        User currentUser = getCurrentUser();
        var user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        CvAnalysis cv = cvAnalysisRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Analysis not found"));

        CvAnalysisResponseDto response = new CvAnalysisResponseDto();

        response.setName(cv.getName());
        response.setTitle(cv.getTitle());
        response.setSummary(cv.getSummary());
        response.setSkills(cv.getSkills());

        // projects
        cv.getProjects().forEach(p -> {
            ProjectDto project = new ProjectDto();
            project.setName(p.getName());
            project.setDescription(p.getDescription());
            project.setTechStack(p.getTechStack());

            response.getProjects().add(project);
        });

        // experience
        cv.getExperiences().forEach(exp -> {
            ExperienceDto e = new ExperienceDto();
            e.setCompany(exp.getCompany());
            e.setTitle(exp.getTitle());
            e.setStartDate(exp.getStartDate());
            e.setEndDate(exp.getEndDate());
            e.setDescription(exp.getDescription());

            response.getExperience().add(e);
        });

        return response;

    }
    @Override
    public CvAnalysisResponseDto reUploadCv(MultipartFile file) {

        // 1. get user
        User currentUser = getCurrentUser();

        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. save new cv
        String filePath = saveCv(file);
        user.setCvFile(filePath);
        userRepository.save(user);

        // 3. delete old analysis (cascade not relied on)
        Optional<CvAnalysis> existing = cvAnalysisRepository.findByUser(user);

        existing.ifPresent(oldCv -> {
            projectRepository.deleteAll(oldCv.getProjects());
            experienceRepository.deleteAll(oldCv.getExperiences());
            cvAnalysisRepository.delete(oldCv);
        });

        // 4. call AI
        cvAnalysisClientImpl.analyzeCvAsPdf(filePath);
        CvAnalysisResponseDto response = cvAnalysisClientImpl.analysisResult();

        // 5. save new analysis
        CvAnalysis cv = new CvAnalysis();
        cv.setUser(user);
        cv.setName(response.getName());
        cv.setTitle(response.getTitle());
        cv.setSummary(response.getSummary());
        cv.setCreatedAt(LocalDateTime.now());
        cv.setSkills(response.getSkills());

        cvAnalysisRepository.save(cv);

        // projects
        response.getProjects().forEach(p -> {
            CvProject project = new CvProject();
            project.setCv(cv);
            project.setName(p.getName());
            project.setDescription(p.getDescription());
            project.setTechStack(p.getTechStack());
            projectRepository.save(project);
        });

        // experience
        response.getExperience().forEach(exp -> {
            CvExperience experience = new CvExperience();
            experience.setCv(cv);
            experience.setCompany(exp.getCompany());
            experience.setTitle(exp.getTitle());
            experience.setDescription(exp.getDescription());
            experienceRepository.save(experience);
        });

        // 6. return fresh result
        return response;
    }

    private String saveCv(MultipartFile file) {

        try {
            String uploadDir = "uploads/cv/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return path.toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload CV");
        }
    }
}
