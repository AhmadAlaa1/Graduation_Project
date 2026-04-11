package com.example.interviewapp.Models.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private InterviewQuestion question;

    private String answerText;
    private String answerAudio;

    private LocalDateTime createdAt;
}