package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor

public class CvServiceImpl implements CvService {
    private final UserRepository userRepository;
    private final CvAnalysisClientImpl cvAnalysisClientImpl;
    private final CvAnalysisRepository cvAnalysisRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final JWTServiceImpl jwtService;

    @Override
    public void sendCvToAnalysis(User dto) {

        var user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<CvAnalysis> existing = cvAnalysisRepository.findByUser(user);
        if (existing.isPresent()) {

            CvAnalysis cv = existing.get();

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
    }

}
