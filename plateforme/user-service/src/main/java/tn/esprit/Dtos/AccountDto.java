package tn.esprit.Dtos;


import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.Entitys.Gender;
import tn.esprit.Entitys.StateRegion;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountDto {
    long id;
    //LocalDateTime createdAt;
    //@NotBlank(message = "AccountDto : firstname NotBlank")
    //@Size(min = 2, max = 50 , message = "AccountDto : firstname must between 2 - 50")
    String firstname;
    String lastname;
    int cin;
    int phone;
    LocalDate dateOfBirth;
    //@Email(message = "AccountDto : email must be correct")
    String email;
    String linkedIn;
    String github;
    Gender gender;
    StateRegion state;
    String city;
    int zipCode;
    String address;
    UserDto userDto;
    List<AttachementDto> attachementsDto;
}

