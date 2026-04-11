package com.example.interviewapp.Controllers;

import com.example.interviewapp.Services.CvService;
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
    private final CvService cvService;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeCv(Authentication authentication) {

        var result = cvService.analyzeCv(authentication);

        return ResponseEntity.ok(result);
    }
}
