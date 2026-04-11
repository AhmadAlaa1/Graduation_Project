package com.example.interviewapp.Services;

import com.example.interviewapp.Models.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Models.Entities.CvAnalysis;
import com.example.interviewapp.Models.Entities.CvExperience;
import com.example.interviewapp.Models.Entities.CvProject;
import com.example.interviewapp.Models.Entities.User;
import com.example.interviewapp.Repositories.CvAnalysisRepository;
import com.example.interviewapp.Repositories.ExperienceRepository;
import com.example.interviewapp.Repositories.ProjectRepository;
import com.example.interviewapp.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class CvService {
    private final UserRepository userRepository;
    private final PdfService pdfService;
    private final AiService aiService;
    private final CvAnalysisRepository cvAnalysisRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;


    public CvAnalysisResponseDto analyzeCv(Authentication authentication) {

        String email = authentication.getName();

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String cvPath = user.getCvFile();
        CvAnalysisResponseDto response = aiService.analyzeCvAsPdf(cvPath);
        String cvText = pdfService.extractTextFromPdf(cvPath);

//        CvAnalysisResponseDto response = aiService.analyzeCvAsText(cvText);

        saveAnalysis(user, response);

        return response;
    }

    private void saveAnalysis(User user, CvAnalysisResponseDto response) {
        CvAnalysis cv = new CvAnalysis();

        cv.setUser(user);
        cv.setName(response.getName());
        cv.setTitle(response.getTitle());
        cv.setSummary(response.getSummary());

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
