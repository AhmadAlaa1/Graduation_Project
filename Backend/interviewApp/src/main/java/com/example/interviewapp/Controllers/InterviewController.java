package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.EvaluationResponseDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.Dtos.StartInterviewDto;
import com.example.interviewapp.Dtos.SubmitAnswersDto;
import com.example.interviewapp.Services.InterviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/inter")
@AllArgsConstructor
public class InterviewController {
    private final InterviewService interviewService;


    @GetMapping("/start")
    public InterviewQuestionsResponseDto generate() {

        return interviewService.generateInterviewQuestions();
    }
    @PostMapping("/startWithJob")
    public InterviewQuestionsResponseDto generateJobQuestion(@RequestBody StartInterviewDto startInterviewDto) {

        return interviewService.generateInterviewJobQuestions(startInterviewDto);
    }

    @PostMapping(value = "/{id}/finish", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EvaluationResponseDto submitAnswers(
            @PathVariable UUID id,
            @ModelAttribute SubmitAnswersDto dto) {

        interviewService.submitAnswers(id, dto);
        return interviewService.finishInterview(id);
    }


}
