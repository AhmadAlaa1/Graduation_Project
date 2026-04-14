package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.Answer;
import com.example.interviewapp.Models.CvAnalysis;
import com.example.interviewapp.Models.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, UUID> {
    boolean existsByQuestion(InterviewQuestion question);
}
