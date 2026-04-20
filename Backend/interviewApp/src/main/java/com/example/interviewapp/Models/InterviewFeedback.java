package com.example.interviewapp.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "interview_feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewFeedback {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "question_id")
    private InterviewQuestion interviewQuestion;

    private Float score;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String gaps;

    @Column(columnDefinition = "TEXT")
    private String betterAnswer;

    @Column(columnDefinition = "TEXT")
    private String followupQuestion;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private LocalDateTime createdAt;
}

