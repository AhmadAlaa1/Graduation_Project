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

    private String name;
    private String title;
    private String summary;
    private String skills;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cv")
    private List<CvExperience> experiences;

    @OneToMany(mappedBy = "cv")
    private List<CvProject> projects;
}
