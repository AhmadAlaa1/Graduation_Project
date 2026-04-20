package com.example.interviewapp.External.Ai.Impl;

import com.example.interviewapp.Dtos.EvaluationRequestDto;
import com.example.interviewapp.Dtos.EvaluationResponseDto;
import com.example.interviewapp.Dtos.InterviewPlanRequestDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.External.Ai.InterviewClient;
import com.example.interviewapp.Models.CvAnalysis;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InterviewClientImpl implements InterviewClient {
    private final RestTemplate restTemplate;
    @Override
    public InterviewQuestionsResponseDto getInterviewQuestions(CvAnalysis cvAnalysis) {

        // Build request body
        InterviewPlanRequestDto requestBody = new InterviewPlanRequestDto();
        requestBody.setRole(cvAnalysis.getTitle() != null ? cvAnalysis.getTitle() : "Software Engineering");
        requestBody.setLevel("junior");
        requestBody.setTotal_q(5);
        requestBody.setSession_seed(0);

        Map<String, Object> cvData = new HashMap<>();
        cvData.put("name", cvAnalysis.getName());
        cvData.put("title", cvAnalysis.getTitle());
        cvData.put("summary", cvAnalysis.getSummary());
        cvData.put("skills", cvAnalysis.getSkills());
        requestBody.setCv_analysis(cvData);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<InterviewPlanRequestDto> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<InterviewQuestionsResponseDto> response =
                restTemplate.postForEntity(
                        "https://ahmadalaa1-speech-llm-api.hf.space/api/cv-interview-plan",
                        request,
                        InterviewQuestionsResponseDto.class
                );

        return response.getBody();
    }
    @Override
    public EvaluationResponseDto evaluate(EvaluationRequestDto request) {

        ResponseEntity<EvaluationResponseDto> response =
                restTemplate.postForEntity(
                        "https://ahmadalaa1-speech-llm-api.hf.space/api/evaluate-batch",
                        request,
                        EvaluationResponseDto.class
                );

        return response.getBody();
    }

}
