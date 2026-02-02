package io.getarrays.contactapi.service;

import org.springframework.http.HttpStatus;
import io.getarrays.contactapi.model.User;
import io.getarrays.contactapi.repo.TodoRepo;
import io.getarrays.contactapi.mappers.TodoMapper;
import io.getarrays.contactapi.dtos.UserDto;
import io.getarrays.contactapi.dtos.TodoDto;
import io.getarrays.contactapi.exceptions.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;
import io.getarrays.contactapi.model.Todo;

import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TodoService {
    private final TodoRepo todoRepo;
    private final TodoMapper todoMapper;

    public List<TodoDto> findUsersTodos(String username) {
        List<Todo> todos = todoRepo.findAllByUsername(username);
        return todoMapper.toTodoDtos(todos);
    }

        public TodoDto createTodo(TodoDto todoDto, String username) {
        Todo todo = new Todo();
        todo.setTask(todoDto.getTask());
        todo.setIsCompleted(
            todoDto.getIsCompleted() != null
                ? todoDto.getIsCompleted()
                : false
        );
        todo.setIsStarred(
            todoDto.getIsStarred() != null
                ? todoDto.getIsStarred()
                : false
        );
        todo.setUsername(username);
        todo.setDateCompleted(null);
        todo.setDateCreated(Instant.now().toString());


        Todo savedTodo = todoRepo.save(todo);
        return todoMapper.toTodoDto(savedTodo);
    }

    public void deleteTodo(String id, String username) {
        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new AppException("Todo not found", HttpStatus.NOT_FOUND));

        if (!todo.getUsername().equals(username)) {
            throw new AppException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        todoRepo.deleteById(id);
    }

    public TodoDto toggleTodo(String id, String username) {
        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new AppException("Todo not found", HttpStatus.NOT_FOUND));

        if (!todo.getUsername().equals(username)) {
            throw new AppException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Boolean currentStatus = todo.getIsCompleted();
        todo.setIsCompleted(!currentStatus);
        if (!currentStatus) {
            todo.setDateCompleted(Instant.now().toString());
        } else {
            todo.setDateCompleted(null);
        }

        Todo updatedTodo = todoRepo.save(todo);
        return todoMapper.toTodoDto(updatedTodo);
    }

    public TodoDto starTodo(String id, String username) {
        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new AppException("Todo not found", HttpStatus.NOT_FOUND));

        if (!todo.getUsername().equals(username)) {
            throw new AppException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Boolean currentStarred = todo.getIsStarred();
        todo.setIsStarred(!currentStarred);

        Todo updatedTodo = todoRepo.save(todo);
        return todoMapper.toTodoDto(updatedTodo);
    }

}