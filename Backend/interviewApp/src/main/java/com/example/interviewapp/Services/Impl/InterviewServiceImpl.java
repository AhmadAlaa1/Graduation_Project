package com.example.interviewapp.Services.Impl;

import com.example.interviewapp.Dtos.*;
import com.example.interviewapp.Exceptions.DuplicateResourceException;
import com.example.interviewapp.Exceptions.ResourceNotFoundException;
import com.example.interviewapp.External.Ai.Impl.InterviewClientImpl;
import com.example.interviewapp.External.Ai.InterviewClient;
import com.example.interviewapp.External.Ai.TtsClient;
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
    private final InterviewClient interviewClient;
    private final AnswerRepository answerRepository;
    private final InterviewFeedbackRepository interviewFeedbackRepository;
    private final CvAnalysisRepository cvAnalysisRepository;
    private final TtsClient ttsClient;private final FileStorageService fileStorageService;


    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }


    @Override
    public InterviewQuestionsResponseDto generateInterviewQuestions() {

        User currentUser = getCurrentUser();

        CvAnalysis cvAnalysis = cvAnalysisRepository.findByUser(currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("CV analysis not found. Please upload your CV first."));
        Interview interview = new Interview();
        interview.setUser(currentUser);
        interview.setCreatedAt(LocalDateTime.now());
        interviewRepository.save(interview);

        InterviewQuestionsResponseDto aiResponse =
                interviewClient.getInterviewQuestions(cvAnalysis);

        return buildInterviewResponse(interview, aiResponse);

    }
    @Override
    public void submitAnswers(UUID interviewId, SubmitAnswersDto dto) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        List<Answer> answers = new ArrayList<>();

        for (AnswerRequestDto a : dto.getAnswers()) {

            InterviewQuestion question = interviewQuestionRepository.findById(a.getQuestionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

            if (answerRepository.existsByQuestion(question)) {
                throw new DuplicateResourceException("Already answered");
            }

            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setCreatedAt(LocalDateTime.now());

            if (a.getAnswerText() != null && !a.getAnswerText().isBlank()) {
                answer.setAnswerText(a.getAnswerText());
            }

            else if (a.getAnswerAudio() != null && !a.getAnswerAudio().isEmpty()) {

                String audioPath = fileStorageService.saveAudio(a.getAnswerAudio());
                answer.setAnswerAudio(audioPath);

                String recognizedText =
                        ttsClient.speechToText(audioPath);

                answer.setAnswerText(recognizedText);
            }

            answers.add(answer);
        }

        answerRepository.saveAll(answers);
    }



    @Override
    public EvaluationResponseDto finishInterview(UUID interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        List<InterviewQuestion> questions =
                interviewQuestionRepository.findByInterview(interview);

        EvaluationRequestDto request = new EvaluationRequestDto();

        List<InterviewQuestion> answeredQuestions = new ArrayList<>();

        for (InterviewQuestion q : questions) {
            Optional<Answer> answerOpt = answerRepository.findFirstByQuestion(q);
            if (answerOpt.isEmpty()) continue;

            Answer answer = answerOpt.get();

            EvaluationItemDto item = new EvaluationItemDto();
            item.setQuestion(q.getQuestionText());
            item.setAnswer_text(
                    answer.getAnswerText() != null ? answer.getAnswerText() : "Audio answer"
            );

            request.getItems().add(item);
            answeredQuestions.add(q);
        }

        // call AI
        EvaluationResponseDto response = interviewClient.evaluate(request);

        for (int i = 0; i < response.getEvaluations().size(); i++) {

            if (i >= answeredQuestions.size()) break;

            InterviewQuestion question = answeredQuestions.get(i);
            EvaluationDto eval = response.getEvaluations().get(i);

            interviewFeedbackRepository.findByInterviewQuestion(question)
                    .ifPresent(interviewFeedbackRepository::delete);

            InterviewFeedback feedback = new InterviewFeedback();
            feedback.setInterviewQuestion(question);
            feedback.setScore(eval.getScore());
            feedback.setStrengths(
                    eval.getStrengths() != null ? String.join(", ", eval.getStrengths()) : ""
            );
            feedback.setGaps(
                    eval.getGaps() != null ? String.join(", ", eval.getGaps()) : ""
            );
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
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

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

    @Override
    public InterviewQuestionsResponseDto generateInterviewJobQuestions(StartInterviewDto startInterviewDto) {
        User currentUser = getCurrentUser();

        CvAnalysis cvAnalysis = cvAnalysisRepository.findByUser(currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("CV analysis not found. Please upload your CV first."));

        // Create interview
        Interview interview = new Interview();
        interview.setUser(currentUser);
        interview.setCreatedAt(LocalDateTime.now());
        interviewRepository.save(interview);

        InterviewQuestionsResponseDto aiResponse =
                interviewClient.getInterviewJobQuestions(startInterviewDto);

        return buildInterviewResponse(interview, aiResponse);
    }

    private InterviewQuestionsResponseDto buildInterviewResponse(
            Interview interview,
            InterviewQuestionsResponseDto aiResponse) {

        InterviewQuestionsResponseDto response = new InterviewQuestionsResponseDto();
        response.setInterviewId(interview.getId());
        List<String> questionTexts = aiResponse.getQuestions();

        for (int i = 0; i < questionTexts.size(); i++) {
            String questionText = questionTexts.get(i);

            InterviewQuestion question = new InterviewQuestion();
            question.setInterview(interview);
            question.setQuestionText(questionText);
            question.setOrderNumber(i + 1);
            question.setQuestionAudio(ttsClient.generateAudio(questionText));

            InterviewQuestion saved = interviewQuestionRepository.save(question);

            QuestionDto dto = new QuestionDto();
            dto.setQuestionID(saved.getId());
            dto.setQuestionText(saved.getQuestionText());
            dto.setQuestionAudio(saved.getQuestionAudio());
            dto.setOrderNumber(saved.getOrderNumber());
            response.getMappedQuestions().add(dto);
        }
        return response;
    }
}

