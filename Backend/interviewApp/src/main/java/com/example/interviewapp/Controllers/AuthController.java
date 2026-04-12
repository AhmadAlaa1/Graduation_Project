package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.AuthResponseDto;
import com.example.interviewapp.Dtos.LoginDto;
import com.example.interviewapp.Dtos.RegisterDto;
import com.example.interviewapp.Services.Impl.AuthServiceImpl;
import com.example.interviewapp.Services.Impl.CvServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthServiceImpl authServiceImpl;
    private final CvServiceImpl cvService;



    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuthResponseDto> signUp(
            @RequestParam("data") String requestJson,
            @RequestPart("cv") MultipartFile cvFile
    ) throws JsonProcessingException {

        RegisterDto request = new ObjectMapper().readValue(requestJson, RegisterDto.class);

        AuthResponseDto result = this.authServiceImpl.signUp(request, cvFile);

        return ResponseEntity.ok(result);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponseDto> signIp(@RequestBody LoginDto loginDto){
        System.out.println("Incoming register data: " + loginDto);
        AuthResponseDto result = this.authServiceImpl.signIn(loginDto);
        return ResponseEntity.ok(result);
    }
}
