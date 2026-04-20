package com.example.interviewapp.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactDto {
    private String email;
    private String phone;
    private String linkedin;
    private String github;
}
