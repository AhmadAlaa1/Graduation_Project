package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.AuthResponseDto;
import com.example.interviewapp.Dtos.CvAnalysisResponseDto;
import com.example.interviewapp.Dtos.InterviewListDto;
import com.example.interviewapp.Dtos.UserDto;
import com.example.interviewapp.Exceptions.ResourceNotFoundException;
import com.example.interviewapp.External.Ai.Impl.CvAnalysisClientImpl;
import com.example.interviewapp.Models.Interview;
import com.example.interviewapp.Models.InterviewQuestion;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Repositories.InterviewQuestionRepository;
import com.example.interviewapp.Repositories.InterviewRepository;
import com.example.interviewapp.Repositories.UserRepository;
import com.example.interviewapp.Services.CvService;
import com.example.interviewapp.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final CvService cvService;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final InterviewRepository interviewRepository;
    private final FileStorageService fileStorageService;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public UserDto updateUser(UserDto dto, MultipartFile cvFile) {

        User user = getCurrentUser();

        if (dto.getFirstName() != null)
            user.setFirstName(dto.getFirstName());

        if (dto.getLastName() != null)
            user.setLastName(dto.getLastName());

        if (dto.getPhone() != null)
            user.setPhone(dto.getPhone());

        if (dto.getAge() != null)
            user.setAge(dto.getAge());

        if (dto.getNationality() != null)
            user.setNationality(dto.getNationality());

        if (dto.getCity() != null)
            user.setCity(dto.getCity());
        if (cvFile != null && !cvFile.isEmpty()) {
            user.setCvFile(fileStorageService.saveCv(cvFile));
        }
        userRepository.save(user);
        UserDto userDto = UserDto.from(user);
        cvService.sendCvToAnalysis(user);
        return userDto;
    }

    @Override
    public void deleteMyAccount() {
        User user = getCurrentUser();
        userRepository.delete(user);
    }
    @Override
    public UserDto userInfo(){
        User user = getCurrentUser();
        UserDto dto = new UserDto();

        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAge(user.getAge());
        dto.setNationality(user.getNationality());
        dto.setCity(user.getCity());
        dto.setCvFile(user.getCvFile());

        return dto;
    }

    @Override
    public List<InterviewListDto> getUserInterviews() {

        User user = getCurrentUser();

        List<Interview> interviews = interviewRepository.findByUserWithQuestions(user);

        return interviews.stream().map(i -> {
            InterviewListDto dto = new InterviewListDto();
            dto.setId(i.getId());
            dto.setCreatedAt(i.getCreatedAt());
            dto.setQuestionsCount(i.getQuestions().size());
            return dto;
        }).toList();
    }
}
