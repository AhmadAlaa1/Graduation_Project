package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.*;
import com.example.interviewapp.External.Ai.Impl.InterviewClientImpl;
import com.example.interviewapp.Models.*;
import com.example.interviewapp.Repositories.*;
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
    private final InterviewFeedbackRepository interviewFeedbackRepository;

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
        response.setInterviewId(interview.getId());
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

    @Override
    public EvaluationResponseDto finishInterview(UUID interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        List<InterviewQuestion> questions =
                interviewQuestionRepository.findByInterview(interview);

        EvaluationRequestDto request = new EvaluationRequestDto();

        for (InterviewQuestion q : questions) {

            Optional<Answer> answerOpt =
                    answerRepository.findFirstByQuestion(q);

            if (answerOpt.isEmpty()) continue;

            Answer answer = answerOpt.get();

            EvaluationItemDto item = new EvaluationItemDto();
            item.setQuestion(q.getQuestionText());

            if (answer.getAnswerText() != null) {
                item.setAnswerText(answer.getAnswerText());
            } else {
                item.setAnswerText("Audio answer");
            }

            request.getItems().add(item);
        }

        // call AI
        EvaluationResponseDto response = interviewClient.evaluate(request);

        // save feedback
        for (int i = 0; i < response.getEvaluations().size(); i++) {

            InterviewQuestion question = questions.get(i);
            EvaluationDto eval = response.getEvaluations().get(i);
            if (question.getFeedback() != null) {
                interviewFeedbackRepository.delete(question.getFeedback());
            }
            InterviewFeedback feedback = new InterviewFeedback();
            feedback.setInterviewQuestion(question);
            feedback.setScore(eval.getScore());

            feedback.setStrengths(String.join(", ", eval.getStrengths()));
            feedback.setGaps(String.join(", ", eval.getGaps()));

            feedback.setBetterAnswer(eval.getBetterAnswer());
            feedback.setFollowupQuestion(eval.getFollowupQuestion());
            feedback.setFeedback(eval.getFeedback());

            feedback.setCreatedAt(LocalDateTime.now());

            interviewFeedbackRepository.save(feedback);
        }

        return response;
    }

    @Override
    public InterviewDetailsDto getInterviewDetails(UUID interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        InterviewDetailsDto response = new InterviewDetailsDto();
        response.setInterviewId(interviewId);

        List<InterviewQuestion> questions =
                interviewQuestionRepository.findByInterview(interview);

        for (InterviewQuestion q : questions) {

            QuestionDetailsDto dto = new QuestionDetailsDto();

            dto.setQuestionId(q.getId());
            dto.setQuestionText(q.getQuestionText());
            dto.setQuestionAudio(q.getQuestionAudio());

            // answer
            Optional<Answer> answerOpt =
                    answerRepository.findFirstByQuestion(q);

            if (answerOpt.isPresent()) {

                Answer answer = answerOpt.get();

                dto.setAnswerText(answer.getAnswerText());
                dto.setAnswerAudio(answer.getAnswerAudio());
            }

            // feedback
            if (q.getFeedback() != null) {

                InterviewFeedback f = q.getFeedback();
                EvaluationDto evaluationDto = new EvaluationDto();

                evaluationDto.setScore(f.getScore());

                evaluationDto.setStrengths(
                        f.getStrengths() != null
                                ? Arrays.asList(f.getStrengths().split("\\s*,\\s*"))
                                : new ArrayList<>()
                );

                evaluationDto.setGaps(
                        f.getGaps() != null
                                ? Arrays.asList(f.getGaps().split("\\s*,\\s*"))
                                : new ArrayList<>()
                );

                evaluationDto.setBetterAnswer(f.getBetterAnswer());
                evaluationDto.setFollowupQuestion(f.getFollowupQuestion());
                evaluationDto.setFeedback(f.getFeedback());

                dto.setEvaluationDto(evaluationDto);
            }

            response.getQuestions().add(dto);
        }

        return response;
    }
}

