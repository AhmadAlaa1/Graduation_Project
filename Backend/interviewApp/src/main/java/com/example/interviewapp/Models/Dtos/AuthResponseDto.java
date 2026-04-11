package com.example.interviewapp.Models.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthResponseDto {

    private String message;
    private UserDto user;
    private String token;


}
