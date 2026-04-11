package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.Entities.CvExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ExperienceRepository extends JpaRepository<CvExperience, UUID> {
}
