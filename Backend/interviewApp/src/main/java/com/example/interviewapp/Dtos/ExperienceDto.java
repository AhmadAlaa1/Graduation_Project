package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class ExperienceDto {
    private String role;
    private String location;
    private String dates;
    private List<String> highlights = new ArrayList<>();

}
