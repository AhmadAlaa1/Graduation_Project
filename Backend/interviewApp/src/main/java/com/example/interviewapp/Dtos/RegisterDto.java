package com.example.interviewapp.Dtos;


import com.example.interviewapp.Models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Integer age;
    private String nationality;
    private String city;
    private String password;

    public RegisterDto() {}

    public User toEntity() {
        User user = new User();
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setEmail(this.email);
        user.setPassword(this.password);
        user.setPhone(this.phone);
        user.setAge(this.age);
        user.setNationality(this.nationality);
        user.setCity(this.city);
        return user;
    }
}