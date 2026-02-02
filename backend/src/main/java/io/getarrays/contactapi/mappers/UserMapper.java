package io.getarrays.contactapi.mappers;

import io.getarrays.contactapi.dtos.UserDto;
import io.getarrays.contactapi.dtos.SignUpDto;
import io.getarrays.contactapi.model.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}