package com.example.interviewapp.Controllers;

import com.example.interviewapp.Dtos.InterviewDetailsDto;
import com.example.interviewapp.Dtos.InterviewListDto;
import com.example.interviewapp.Dtos.UserDto;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Services.Impl.UserServiceImpl;
import com.example.interviewapp.Services.InterviewService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    private final InterviewService interviewService;

    @PutMapping("/edit-profile")
    public ResponseEntity<UserDto> updateUser( @RequestPart("data") String requestJson,
                                            @RequestPart(value = "cv", required = false) MultipartFile cvFile
    ) throws JsonProcessingException {
        UserDto request = new ObjectMapper().readValue(requestJson, UserDto.class);
        UserDto result = this.userService.updateUser(request, cvFile);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<String> deleteMyAccount() {
        userService.deleteMyAccount();
        return ResponseEntity.ok("Account deleted successfully");
    }

    @GetMapping("/my-info")
    public ResponseEntity<UserDto> userInfo(){
        return ResponseEntity.ok(userService.userInfo());
    }

    @GetMapping("/my-interviews")
    public List<InterviewListDto> getMyInterviews() {
        return userService.getUserInterviews();
    }

    @GetMapping("/{id}/interview-details")
    public InterviewDetailsDto getInterviewDetails(@PathVariable UUID id) {
        return interviewService.getInterviewDetails(id);
    }
}
