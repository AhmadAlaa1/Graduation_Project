package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Services.CvService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/cv")
@AllArgsConstructor
public class CvController {
    private final CvService cvService;

    @GetMapping("/my-cv-analysis")
    public ResponseEntity<CvAnalysisResponseDto> analyzeCv() {

        return ResponseEntity.ok(cvService.returnCvAnalysis());
    }

    @PutMapping("/upload-cv")
    public ResponseEntity<CvAnalysisResponseDto> reUploadCv(
            @RequestPart(value = "cv") MultipartFile cvFile
    ) throws JsonProcessingException {


        CvAnalysisResponseDto result = this.cvService.reUploadCv(cvFile);

        return ResponseEntity.ok(result);
    }
}
