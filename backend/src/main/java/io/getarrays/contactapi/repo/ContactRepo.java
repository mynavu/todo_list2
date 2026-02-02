package io.getarrays.contactapi.repo;

import org.springframework.stereotype.Repository;

import io.getarrays.contactapi.model.Contact;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {
}
