package com.example.interviewapp.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserDto{
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private Integer age;
        private String nationality;
        private String city;
        private String cvFile;
}
