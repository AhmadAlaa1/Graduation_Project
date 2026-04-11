package com.example.interviewapp.Models;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "cv_experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CvExperience {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private CvAnalysis cv;

    private String company;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
}
