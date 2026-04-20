package com.example.interviewapp.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "cv_education")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CvEducation {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private CvAnalysis cv;

    private String degree;

    @Column(length = 500)
    private String institution;

    private String status;
}