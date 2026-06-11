package com.example.interviewapp.External.Ai;

public interface TtsClient {
    String generateAudio(String text);
    public String speechToText(String audioPath);
}
