package io.getarrays.contactapi.controller;

import io.getarrays.contactapi.config.UserAuthProvider;
import io.getarrays.contactapi.dtos.CredentialsDto;
import io.getarrays.contactapi.dtos.SignUpDto;
import io.getarrays.contactapi.dtos.UserDto;
import io.getarrays.contactapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import io.getarrays.contactapi.dtos.TodoDto;
import io.getarrays.contactapi.service.TodoService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/todo_list")
    public ResponseEntity<List<TodoDto>> getTodos(Authentication authentication) {
        String username = authentication.getName();
        List<TodoDto> todos = todoService.findUsersTodos(username);
        return ResponseEntity.ok(todos);
    }


    @PostMapping("/create_todo")
    public ResponseEntity<TodoDto> createTodo(
            @RequestBody TodoDto todoDto,
            Authentication authentication
    ) {
        String username = authentication.getName(); // from JWT
        TodoDto createdTodo = todoService.createTodo(todoDto, username);
        return ResponseEntity.ok(createdTodo);
    }


    @DeleteMapping("/delete_todo/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable String id,
            Authentication authentication
    ) {
        String username = authentication.getName(); // from JWT
        todoService.deleteTodo(id, username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/toggle_todo/{id}")
    public ResponseEntity<TodoDto> toggleTodo(
            @PathVariable String id,
            Authentication authentication
    ) {
        String username = authentication.getName(); // from JWT
        TodoDto toggledTodo = todoService.toggleTodo(id, username);
        return ResponseEntity.ok(toggledTodo);
    }

    @PutMapping("/star_todo/{id}")
    public ResponseEntity<TodoDto> starTodo(
            @PathVariable String id,
            Authentication authentication
    ) {
        String username = authentication.getName(); // from JWT
        TodoDto starredTodo = todoService.starTodo(id, username);
        return ResponseEntity.ok(starredTodo);
    }
}