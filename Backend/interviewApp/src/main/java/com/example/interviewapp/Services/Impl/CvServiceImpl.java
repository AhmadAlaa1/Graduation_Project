package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.*;
import com.example.interviewapp.External.Ai.Impl.CvAnalysisClientImpl;
import com.example.interviewapp.Models.*;
import com.example.interviewapp.Repositories.*;
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
import java.util.ArrayList;
import java.util.List;
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
    private final EducationRepository educationRepository;
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

        // Delete old analysis
        Optional<CvAnalysis> existing = cvAnalysisRepository.findByUser(user);
        existing.ifPresent(oldCv -> {
            projectRepository.deleteAll(oldCv.getProjects());
            experienceRepository.deleteAll(oldCv.getExperiences());
            educationRepository.deleteAll(oldCv.getEducation());
            cvAnalysisRepository.delete(oldCv);
        });

        String cvPath = user.getCvFile();
        CvAnalysisResponseDto response = cvAnalysisClientImpl.analyzeCvAsPdf(cvPath);

        CvAnalysis cv = new CvAnalysis();
        cv.setUser(user);
        cv.setCreatedAt(LocalDateTime.now());

        // Basic Info
        cv.setName(response.getName());
        cv.setTitle(response.getTitle());
        cv.setSummary(response.getSummary());
        cv.setLocation(response.getLocation());

        // Contact
        if (response.getContact() != null) {
            cv.setEmail(response.getContact().getEmail());
            cv.setPhone(response.getContact().getPhone());
            cv.setLinkedin(response.getContact().getLinkedin());
            cv.setGithub(response.getContact().getGithub());
        }

        // Skills
        cv.setSkills(response.getSkills() != null
                ? response.getSkills().toCommaSeparated()
                : "");

        // ATS Score
        if (response.getAts_score() != null) {
            cv.setAtsScore(response.getAts_score().getPercent());
            cv.setAtsPassed(response.getAts_score().isPassed());
            cv.setMatchedSkills(String.join(", ", response.getAts_score().getMatched_skills()));
            cv.setMissingSkills(String.join(", ", response.getAts_score().getMissing_skills()));
        }

        // Suggested Questions
        if (response.getSuggested_interview_questions() != null) {
            cv.setSuggestedQuestions(
                    String.join("||", response.getSuggested_interview_questions())
            );
        }

        cvAnalysisRepository.save(cv);

        // Projects
        if (response.getProjects() != null) {
            response.getProjects().forEach(p -> {
                CvProject project = new CvProject();
                project.setCv(cv);
                project.setName(p.getName() != null ? p.getName() : "");
                project.setRole(p.getRole() != null ? p.getRole() : "");
                project.setYear(p.getYear() != null ? p.getYear() : "");
                project.setDescription(
                        p.getHighlights() != null
                                ? String.join(". ", p.getHighlights())
                                : ""
                );
                projectRepository.save(project);
            });
        }

        // Experience
        if (response.getExperience() != null) {
            response.getExperience().forEach(exp -> {
                CvExperience experience = new CvExperience();
                experience.setCv(cv);
                experience.setTitle(exp.getRole() != null ? exp.getRole() : "");
                experience.setCompany(exp.getLocation() != null ? exp.getLocation() : "");
                experience.setDates(exp.getDates() != null ? exp.getDates() : "");
                experience.setDescription(
                        exp.getHighlights() != null
                                ? String.join(". ", exp.getHighlights())
                                : ""
                );
                experienceRepository.save(experience);
            });
        }

        // Education
        if (response.getEducation() != null) {
            response.getEducation().forEach(edu -> {
                CvEducation education = new CvEducation();
                education.setCv(cv);
                education.setDegree(edu.getDegree() != null ? edu.getDegree() : "");
                education.setInstitution(edu.getInstitution() != null ? edu.getInstitution() : "");
                education.setStatus(edu.getStatus() != null ? edu.getStatus() : "");
                educationRepository.save(education);
            });
        }
    }
    @Override
    public CvAnalysisResponseDto returnCvAnalysis() {
        User currentUser = getCurrentUser();
        var user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        CvAnalysis cv = cvAnalysisRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Analysis not found"));

        CvAnalysisResponseDto response = new CvAnalysisResponseDto();

        // Basic Info
        response.setName(cv.getName());
        response.setTitle(cv.getTitle());
        response.setSummary(cv.getSummary());
        response.setLocation(cv.getLocation());

        // Contact
        ContactDto contact = new ContactDto();
        contact.setEmail(cv.getEmail());
        contact.setPhone(cv.getPhone());
        contact.setLinkedin(cv.getLinkedin());
        contact.setGithub(cv.getGithub());
        response.setContact(contact);

        // Skills
        SkillsDto skillsDto = new SkillsDto();
        skillsDto.setBackend(
                cv.getSkills() != null && !cv.getSkills().isEmpty()
                        ? List.of(cv.getSkills().split(", "))
                        : new ArrayList<>()
        );
        response.setSkills(skillsDto);

        // ATS Score
        AtsScoreDto atsScore = new AtsScoreDto();
        atsScore.setPercent(cv.getAtsScore() != null ? cv.getAtsScore() : 0);
        atsScore.setPassed(cv.getAtsPassed() != null ? cv.getAtsPassed() : false);
        atsScore.setMatched_skills(
                cv.getMatchedSkills() != null && !cv.getMatchedSkills().isEmpty()
                        ? List.of(cv.getMatchedSkills().split(", "))
                        : new ArrayList<>()
        );
        atsScore.setMissing_skills(
                cv.getMissingSkills() != null && !cv.getMissingSkills().isEmpty()
                        ? List.of(cv.getMissingSkills().split(", "))
                        : new ArrayList<>()
        );
        response.setAts_score(atsScore);

        // Suggested Questions
        if (cv.getSuggestedQuestions() != null && !cv.getSuggestedQuestions().isEmpty()) {
            response.setSuggested_interview_questions(
                    List.of(cv.getSuggestedQuestions().split("\\|\\|"))
            );
        }

        // Projects
        if (cv.getProjects() != null) {
            cv.getProjects().forEach(p -> {
                ProjectDto project = new ProjectDto();
                project.setName(p.getName());
                project.setRole(p.getRole());
                project.setYear(p.getYear());
                project.setHighlights(
                        p.getDescription() != null && !p.getDescription().isEmpty()
                                ? List.of(p.getDescription().split("\\. "))
                                : new ArrayList<>()
                );
                response.getProjects().add(project);
            });
        }

        // Experience
        if (cv.getExperiences() != null) {
            cv.getExperiences().forEach(exp -> {
                ExperienceDto e = new ExperienceDto();
                e.setRole(exp.getTitle());
                e.setLocation(exp.getCompany());
                e.setDates(exp.getDates());
                e.setHighlights(
                        exp.getDescription() != null && !exp.getDescription().isEmpty()
                                ? List.of(exp.getDescription().split("\\. "))
                                : new ArrayList<>()
                );
                response.getExperience().add(e);
            });
        }

        // Education
        if (cv.getEducation() != null) {
            cv.getEducation().forEach(edu -> {
                EducationDto education = new EducationDto();
                education.setDegree(edu.getDegree());
                education.setInstitution(edu.getInstitution());
                education.setStatus(edu.getStatus());
                response.getEducation().add(education);
            });
        }

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
        CvAnalysisResponseDto response = cvAnalysisClientImpl.analyzeCvAsPdf(filePath);

        // 5. save new analysis
        CvAnalysis cv = new CvAnalysis();
        cv.setUser(user);
        cv.setName(response.getName());
        cv.setTitle(response.getTitle());
        cv.setSummary(response.getSummary());
        cv.setLocation(response.getLocation());
        cv.setCreatedAt(LocalDateTime.now());

        // Contact
        if (response.getContact() != null) {
            cv.setEmail(response.getContact().getEmail());
            cv.setPhone(response.getContact().getPhone());
            cv.setLinkedin(response.getContact().getLinkedin());
            cv.setGithub(response.getContact().getGithub());
        }

        // Skills
        cv.setSkills(response.getSkills() != null
                ? response.getSkills().toCommaSeparated()
                : "");

        // ATS Score
        if (response.getAts_score() != null) {
            cv.setAtsScore(response.getAts_score().getPercent());
            cv.setAtsPassed(response.getAts_score().isPassed());
            cv.setMatchedSkills(String.join(", ", response.getAts_score().getMatched_skills()));
            cv.setMissingSkills(String.join(", ", response.getAts_score().getMissing_skills()));
        }

        // Suggested Questions
        if (response.getSuggested_interview_questions() != null) {
            cv.setSuggestedQuestions(
                    String.join("||", response.getSuggested_interview_questions())
            );
        }

        cvAnalysisRepository.save(cv);

        // Projects
        response.getProjects().forEach(p -> {
            CvProject project = new CvProject();
            project.setCv(cv);
            project.setName(p.getName());
            project.setRole(p.getRole());
            project.setYear(p.getYear());
            project.setDescription(
                    p.getHighlights() != null ? String.join(". ", p.getHighlights()) : ""
            );
            projectRepository.save(project);
        });

        // Experience
        response.getExperience().forEach(exp -> {
            CvExperience experience = new CvExperience();
            experience.setCv(cv);
            experience.setTitle(exp.getRole());
            experience.setCompany(exp.getLocation());
            experience.setDates(exp.getDates());
            experience.setDescription(
                    exp.getHighlights() != null ? String.join(". ", exp.getHighlights()) : ""
            );
            experienceRepository.save(experience);
        });

        // Education
        response.getEducation().forEach(edu -> {
            CvEducation education = new CvEducation();
            education.setCv(cv);
            education.setDegree(edu.getDegree());
            education.setInstitution(edu.getInstitution());
            education.setStatus(edu.getStatus());
            educationRepository.save(education);
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
