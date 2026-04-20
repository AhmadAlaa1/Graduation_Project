package com.example.interviewapp.Models;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cv_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CvAnalysis {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Basic info
    private String name;
    private String title;
    private String summary;
    private String location;

    // Contact
    private String email;
    private String phone;
    private String linkedin;
    private String github;

    // Skills (comma-separated)
    private String skills;

    // ATS Score
    private Integer atsScore;
    private Boolean atsPassed;

    @Column(length = 1000)
    private String matchedSkills;  // comma-separated

    @Column(length = 1000)
    private String missingSkills;  // comma-separated

    // Interview questions (stored as JSON string)
    @Column(columnDefinition = "TEXT")
    private String suggestedQuestions;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CvExperience> experiences;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CvProject> projects;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CvEducation> education;
}