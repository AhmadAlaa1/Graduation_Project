package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.CvAnalysis;
import com.example.interviewapp.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository

public interface CvAnalysisRepository extends JpaRepository<CvAnalysis, UUID> {
    Optional<CvAnalysis> findByUser(User user);
}
