package io.getarrays.contactapi.service;

import io.getarrays.contactapi.model.User;
import io.getarrays.contactapi.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import io.getarrays.contactapi.dtos.CredentialsDto;
import io.getarrays.contactapi.dtos.SignUpDto;
import io.getarrays.contactapi.dtos.UserDto;
import io.getarrays.contactapi.exceptions.AppException;
import io.getarrays.contactapi.mappers.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepo.findByUsername(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

            if (passwordEncoder.matches(
                    credentialsDto.getPassword(),
                    user.getPassword()
            )) {
                return userMapper.toUserDto(user);
            }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepo.findByUsername(userDto.getUsername());

        if (optionalUser.isPresent()) {
            throw new AppException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(
            passwordEncoder.encode(userDto.getPassword())
        );


        User savedUser = userRepo.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

}