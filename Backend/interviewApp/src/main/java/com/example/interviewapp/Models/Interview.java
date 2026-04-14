package com.example.interviewapp.Models;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

import java.util.List;

@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "interview",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterviewQuestion> questions;

}

