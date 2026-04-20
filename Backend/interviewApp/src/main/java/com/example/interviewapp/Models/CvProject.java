package com.example.interviewapp.Models;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "cv_projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CvProject {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private CvAnalysis cv;

    private String name;
    private String role;
    private String year;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String techStack;
}