package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mock-ai")
public class MockAiController {





    @PostMapping("/evaluate-batch")
    public EvaluationResponseDto evaluate(@RequestBody EvaluationRequestDto request) {

        EvaluationResponseDto response = new EvaluationResponseDto();

        request.getItems().forEach(item -> {

            EvaluationDto eval = new EvaluationDto();

            eval.setScore(2.4F);

            eval.setStrengths(List.of(
                    "Clear explanation",
                    "Relevant answer"
            ));

            eval.setGaps(List.of(
                    "Needs more depth"
            ));

            eval.setBetterAnswer(
                    "A stronger answer would include technical example and deeper explanation."
            );

            eval.setFollowupQuestion(
                    "Can you provide a real-world example?"
            );

            eval.setFeedback(
                    "Good answer overall but needs more technical depth."
            );

            response.getEvaluations().add(eval);
        });

        return response;
    }
}