package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.InterviewFeedback;
import com.example.interviewapp.Models.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, UUID> {
}
