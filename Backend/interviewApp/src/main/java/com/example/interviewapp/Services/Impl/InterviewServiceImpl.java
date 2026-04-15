package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.*;
import com.example.interviewapp.External.Ai.Impl.InterviewClientImpl;
import com.example.interviewapp.Models.Answer;
import com.example.interviewapp.Models.Interview;
import com.example.interviewapp.Models.InterviewQuestion;
import com.example.interviewapp.Models.User;
import com.example.interviewapp.Repositories.AnswerRepository;
import com.example.interviewapp.Repositories.InterviewQuestionRepository;
import com.example.interviewapp.Repositories.InterviewRepository;
import com.example.interviewapp.Repositories.UserRepository;
import com.example.interviewapp.Services.InterviewService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class InterviewServiceImpl implements InterviewService {
    private final UserRepository userRepository;
    private final InterviewRepository interviewRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final InterviewClientImpl interviewClient;
    private final AnswerRepository answerRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

//    @Override
//    public InterviewDto startInterview() {
//        User currentUser = getCurrentUser();
//        Interview interview = new Interview();
//        interview.setUser(currentUser);
//        interview.setCreatedAt(LocalDateTime.now());
//        interviewRepository.save(interview);
//        InterviewDto interviewDto = new InterviewDto(interview.getId());
//        return interviewDto;
//    }

    @Override
    public InterviewQuestionsResponseDto generateInterviewQuestions() {
        User currentUser = getCurrentUser();
        Interview interview = new Interview();
        interview.setUser(currentUser);
        interview.setCreatedAt(LocalDateTime.now());
        interviewRepository.save(interview);
        User user = interview.getUser();
        String cvPath = user.getCvFile();

//        InterviewQuestionsResponseDto aiResponse =
//                interviewClient.getInterviewQuestions(cvPath);
        InterviewQuestionsResponseDto aiResponse =
                interviewClient.getInterviewQuestionsWithoutpdf();

        InterviewQuestionsResponseDto response = new InterviewQuestionsResponseDto();

        aiResponse.getQuestions().forEach(q -> {

            InterviewQuestion question = new InterviewQuestion();
            question.setInterview(interview);
            question.setQuestionText(q.getQuestionText());
            question.setQuestionAudio(q.getQuestionAudio());
            question.setOrderNumber(q.getOrderNumber());

            InterviewQuestion saved = interviewQuestionRepository.save(question);

            // map to dto with id
            QuestionDto dto = new QuestionDto();
            dto.setQuestionID(saved.getId());
            dto.setQuestionText(saved.getQuestionText());
            dto.setQuestionAudio(saved.getQuestionAudio());
            dto.setOrderNumber(saved.getOrderNumber());

            response.getQuestions().add(dto);
        });

        return response;
    }

    @Override
    public void submitAnswers(UUID interviewId, SubmitAnswersDto dto) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        List<Answer> answers = new ArrayList<>();

        for (AnswerRequestDto a : dto.getAnswers()) {

            InterviewQuestion question = interviewQuestionRepository.findById(a.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            if (answerRepository.existsByQuestion(question)) {
                throw new RuntimeException("Already answered");
            }

            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setCreatedAt(LocalDateTime.now());

            if (a.getAnswerText() != null && !a.getAnswerText().isBlank()) {
                answer.setAnswerText(a.getAnswerText());
            }

            if (a.getAnswerAudio() != null && !a.getAnswerAudio().isEmpty()) {
                String path = saveAudio(a.getAnswerAudio());
                answer.setAnswerAudio(path);
            }

            answers.add(answer);
        }

        answerRepository.saveAll(answers);
    }

    private String saveAudio(MultipartFile file) {

        try {

            String uploadDir = "uploads/answers/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return path.toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload audio");
        }
    }
}

