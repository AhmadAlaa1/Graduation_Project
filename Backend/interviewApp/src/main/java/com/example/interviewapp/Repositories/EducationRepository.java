package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.CvAnalysis;
import com.example.interviewapp.Models.CvEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EducationRepository extends JpaRepository<CvEducation, UUID> {
    void deleteAllByCv(CvAnalysis cv);
}