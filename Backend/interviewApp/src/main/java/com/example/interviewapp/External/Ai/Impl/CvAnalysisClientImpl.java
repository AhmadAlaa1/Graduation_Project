package com.example.interviewapp.External.Ai.Impl;

import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.External.Ai.CvAnalysisClient;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Services.CvService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
public class CvAnalysisClientImpl implements CvAnalysisClient {
    private final RestTemplate restTemplate;

    // post the cv as a pdf file
    @Override
    public CvAnalysisResponseDto analyzeCvAsPdf(String filePath) {
        String url = "https://ahmadalaa1-speech-llm-api.hf.space/api/cv-analysis";
        File file = new File(filePath);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<CvAnalysisResponseDto> response =
                restTemplate.postForEntity(
                        url,
                        request,
                        CvAnalysisResponseDto.class
                );
        return response.getBody();
    }


}
