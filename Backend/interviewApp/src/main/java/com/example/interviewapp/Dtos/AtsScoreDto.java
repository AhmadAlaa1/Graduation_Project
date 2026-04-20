package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AtsScoreDto {
    private int percent;
    private boolean passed;
    private List<String> matched_skills = new ArrayList<>();
    private List<String> missing_skills = new ArrayList<>();
}
