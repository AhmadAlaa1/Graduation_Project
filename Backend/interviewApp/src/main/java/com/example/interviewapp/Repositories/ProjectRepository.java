package com.example.interviewapp.Repositories;

import com.example.interviewapp.Models.CvProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository

public interface ProjectRepository extends JpaRepository<CvProject, UUID> {
}
