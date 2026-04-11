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
    @JoinColumn(name = "interview_id")
    private Interview interview;

    private Float score;

    private String strengths;
    private String gaps;
    private String betterAnswer;
    private String newColumnFollowupQuestion;
    private String feedback;

    private LocalDateTime createdAt;
}

