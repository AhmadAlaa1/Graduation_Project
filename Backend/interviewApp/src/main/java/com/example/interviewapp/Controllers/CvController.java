package com.example.interviewapp.Controllers;

import com.example.interviewapp.Services.Impl.CvServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cv")
@AllArgsConstructor
public class CvController {
    private final CvServiceImpl cvService;

//    @PostMapping("/analyze")
//    public ResponseEntity<?> analyzeCv(String token) {
//
//        cvService.sendCvToAnalysis(token);
//
//        return ResponseEntity.ok("Cv send Successfully");
//    }
}
