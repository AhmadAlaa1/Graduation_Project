package com.example.interviewapp.External.Ai.Impl;

import com.example.interviewapp.Dtos.EvaluationRequestDto;
import com.example.interviewapp.Dtos.EvaluationResponseDto;
import com.example.interviewapp.Dtos.InterviewQuestionsResponseDto;
import com.example.interviewapp.External.Ai.InterviewClient;
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

@Service
@RequiredArgsConstructor
public class InterviewClientImpl implements InterviewClient {
    private final RestTemplate restTemplate;
    @Override
    public InterviewQuestionsResponseDto getInterviewQuestions(String filePath) {

        File file = new File(filePath);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<InterviewQuestionsResponseDto> response =
                restTemplate.postForEntity(
                        "http://localhost:6060/mock-ai/interview/questions",
                        request,
                        InterviewQuestionsResponseDto.class
                );

        return response.getBody();
    }
    @Override
    public InterviewQuestionsResponseDto getInterviewQuestionsWithoutpdf() {

        String url = "http://localhost:6060/mock-ai/interview/questions";

        ResponseEntity<InterviewQuestionsResponseDto> response =
                restTemplate.getForEntity(
                        url,
                        InterviewQuestionsResponseDto.class
                );

        return response.getBody();
    }
    @Override
    public EvaluationResponseDto evaluate(EvaluationRequestDto request) {

        ResponseEntity<EvaluationResponseDto> response =
                restTemplate.postForEntity(
                        "http://localhost:6060/mock-ai/evaluate-batch",
                        request,
                        EvaluationResponseDto.class
                );

        return response.getBody();
    }

}
