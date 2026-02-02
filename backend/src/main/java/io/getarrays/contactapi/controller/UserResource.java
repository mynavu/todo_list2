package io.getarrays.contactapi.controller;

import io.getarrays.contactapi.service.UserService;
import io.getarrays.contactapi.model.User;
import io.getarrays.contactapi.model.Contact;
import io.getarrays.contactapi.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static io.getarrays.contactapi.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource {

    private final UserService userService;

    @GetMapping("/messages")
    public ResponseEntity<List<String>> message() {
        return ResponseEntity.ok(Arrays.asList("first message", "second message"));
    }

    /*
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        //return ResponseEntity.ok().body(contactService.createContact(contact));
        User savedUser = userService.createUser(user);
        return ResponseEntity.created(URI.create("/users/" + savedUser.getId())).body(savedUser);
    }
    */

    
}
