package com.example.interviewapp.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "interview_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestion {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "interview_id")
    private Interview interview;

    private String questionText;
    private String questionAudio;

    private Integer orderNumber;

    @OneToMany(mappedBy = "question",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;


    @OneToOne(mappedBy = "interviewQuestion",cascade = CascadeType.ALL, orphanRemoval = true)
    private InterviewFeedback feedback;
}

