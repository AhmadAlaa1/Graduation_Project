package com.example.interviewapp.External.Ai.Impl;

import com.example.interviewapp.Dtos.*;
import com.example.interviewapp.Exceptions.ExternalServiceException;
import com.example.interviewapp.External.Ai.InterviewClient;
import com.example.interviewapp.Models.CvAnalysis;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InterviewClientImpl implements InterviewClient {
    private final RestTemplate restTemplate;
    @Value("${ai.service.base-url}")
    private String baseUrl;
    @Override
    public InterviewQuestionsResponseDto getInterviewQuestions(CvAnalysis cvAnalysis) {
        try {

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
                            baseUrl+"/cv-interview-plan",
                            request,
                            InterviewQuestionsResponseDto.class
                    );

            return response.getBody();
        } catch (Exception e) {
            throw new ExternalServiceException("Interview Client service failed: " + e.getMessage());
        }
    }

    @Override
    public InterviewQuestionsResponseDto getInterviewJobQuestions(StartInterviewDto startInterviewDto) {
        try {

            // Build request body
            InterviewPlanRequestDto requestBody = new InterviewPlanRequestDto();
            requestBody.setRole(startInterviewDto.getRole());
            requestBody.setLevel(startInterviewDto.getLevel());
            requestBody.setTotal_q(5);
            requestBody.setSession_seed(0);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<InterviewPlanRequestDto> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<InterviewQuestionsResponseDto> response =
                    restTemplate.postForEntity(
                            baseUrl+"/no-cv-interview-plan",
                            request,
                            InterviewQuestionsResponseDto.class
                    );

            return response.getBody();
        } catch (Exception e) {
            throw new ExternalServiceException("Interview Client service failed: " + e.getMessage());
        }
    }

    @Override
    public EvaluationResponseDto evaluate(EvaluationRequestDto request) {
        try {

            ResponseEntity<EvaluationResponseDto> response =
                    restTemplate.postForEntity(
                            baseUrl+"/evaluate-batch",
                            request,
                            EvaluationResponseDto.class
                    );

            return response.getBody();
        } catch (Exception e) {
            throw new ExternalServiceException("Interview Client service failed: " + e.getMessage());
        }
    }

}
