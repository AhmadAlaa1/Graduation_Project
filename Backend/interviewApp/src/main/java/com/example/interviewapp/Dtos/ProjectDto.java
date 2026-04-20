package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectDto {
    private String name;
    private String role;
    private String year;
    private List<String> highlights = new ArrayList<>();
}
