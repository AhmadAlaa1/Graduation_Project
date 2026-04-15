package com.example.interviewapp.Repositories;


import com.example.interviewapp.Models.CvAnalysis;
import com.example.interviewapp.Models.Interview;
import com.example.interviewapp.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, UUID> {
    List<Interview> findByUser(User user);
}
