package com.example.interviewapp.External.Ai.Impl;

import com.example.interviewapp.Exceptions.ExternalServiceException;
import com.example.interviewapp.External.Ai.TtsClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class TtsClientImpl implements TtsClient {

    private final RestTemplate restTemplate;
    @Value("${ai.service.base-url}")
    private String baseUrl;
    @Override
    public String generateAudio(String text) {
        try {

            Map<String, Object> request = new HashMap<>();
            request.put("text", text);
            request.put("out_name", "tts_output");

            ResponseEntity<byte[]> response = restTemplate.postForEntity(
                    baseUrl+"/tts",
                    request,
                    byte[].class
            );

            byte[] audioBytes = response.getBody();

            String baseDir = System.getProperty("user.dir");

            Path folder = Paths.get(baseDir, "interviewapp/uploads/audio");
            try {
                Files.createDirectories(folder);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            String fileName = "tts_" + UUID.randomUUID() + ".mp3";

            Path filePath = folder.resolve(fileName);
            try {
                Files.write(filePath, audioBytes);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            return "/uploads/audio/" + fileName;
        } catch (Exception e) {
            throw new ExternalServiceException("TTS service failed: " + e.getMessage());
        }

    }

    @Override
    public String speechToText(String audioPath) {
        try {

            FileSystemResource audioFile =
                    new FileSystemResource(new File(audioPath));

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("audio", audioFile);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    baseUrl+"/transcribe",
                    requestEntity,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();

            return (String) responseBody.get("text");
        } catch (Exception e) {
            throw new ExternalServiceException("TTS service failed: " + e.getMessage());
        }
    }

}