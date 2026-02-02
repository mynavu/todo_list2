package io.getarrays.contactapi.mappers;

import io.getarrays.contactapi.dtos.TodoDto;
import io.getarrays.contactapi.dtos.SignUpDto;
import io.getarrays.contactapi.model.Todo;
import io.getarrays.contactapi.model.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    List<TodoDto> toTodoDtos(List<Todo> todos);

    TodoDto toTodoDto(Todo todo);


}