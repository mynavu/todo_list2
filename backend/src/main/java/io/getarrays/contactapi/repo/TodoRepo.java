package io.getarrays.contactapi.repo;

import org.springframework.stereotype.Repository;

import io.getarrays.contactapi.model.Todo;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TodoRepo extends JpaRepository<Todo, String> {

    List<Todo> findAllByUsername(String username);
}
