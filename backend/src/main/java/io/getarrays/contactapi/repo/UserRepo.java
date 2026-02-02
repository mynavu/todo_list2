package io.getarrays.contactapi.repo;

import org.springframework.stereotype.Repository;

import io.getarrays.contactapi.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
