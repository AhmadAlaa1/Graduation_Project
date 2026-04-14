package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.InterviewDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.Dtos.SubmitAnswersDto;
import com.example.interviewapp.Models.Interview;
import com.example.interviewapp.Services.InterviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/inter")
@AllArgsConstructor
public class InterviewController {
    private final InterviewService interviewService;


    @PostMapping("/start")
    public ResponseEntity<InterviewDto> startInterview(){

        return ResponseEntity.ok(interviewService.startInterview());
    }
    @PostMapping("/{id}/generate")
    public InterviewQuestionsResponseDto generate(@PathVariable UUID id) {

        return interviewService.generateInterviewQuestions(id);
    }

    @PostMapping(value = "/{id}/answers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void submitAnswers(
            @PathVariable UUID id,
            @ModelAttribute SubmitAnswersDto dto) {

        interviewService.submitAnswers(id, dto);
    }
}
