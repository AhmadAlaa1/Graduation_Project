package com.example.interviewapp.Dtos;

import lombok.*;
import lombok.Data;
@NoArgsConstructor

@AllArgsConstructor
@Data
public class LoginDto {
    private String email;
    private String password;
}
