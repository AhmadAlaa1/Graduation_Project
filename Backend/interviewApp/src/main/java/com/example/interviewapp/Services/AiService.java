package com.example.interviewapp.Services;

import com.example.interviewapp.Models.Dtos.CvAnalysisResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {
    private final RestTemplate restTemplate;

    //post the cv as a text ex:
    //{
    //     "cv": "nedaa hany backend...."
    // }

    public CvAnalysisResponseDto analyzeCvAsText(String cvText) {

        Map<String, Object> body = new HashMap<>();
        body.put("cv", cvText);

        ResponseEntity<CvAnalysisResponseDto> response =
                restTemplate.postForEntity(
                        "http://api/cv-analysis/analyze-cv",
                        body,
                        CvAnalysisResponseDto.class
                );

        return response.getBody();
    }

    // post the cv as a pdf file
    public CvAnalysisResponseDto analyzeCvAsPdf(String filePath) {

        File file = new File(filePath);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<CvAnalysisResponseDto> response =
                restTemplate.postForEntity(
                        "http://httpbin.org/post",
                        request,
                        CvAnalysisResponseDto.class
                );

        return response.getBody();
    }
}
