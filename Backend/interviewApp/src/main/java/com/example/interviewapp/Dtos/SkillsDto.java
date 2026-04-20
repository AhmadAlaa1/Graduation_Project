package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SkillsDto {
    private List<String> backend = new ArrayList<>();
    private List<String> databases = new ArrayList<>();
    private List<String> frontend = new ArrayList<>();
    private List<String> devops_tools = new ArrayList<>();
    private List<String> ai_ml = new ArrayList<>();


    public String toCommaSeparated() {
        List<String> all = new ArrayList<>();
        all.addAll(backend);
        all.addAll(databases);
        all.addAll(frontend);
        all.addAll(devops_tools);
        all.addAll(ai_ml);
        return String.join(", ", all);
    }
}
