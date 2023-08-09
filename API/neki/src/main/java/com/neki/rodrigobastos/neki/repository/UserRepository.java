package com.neki.rodrigobastos.neki.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.neki.rodrigobastos.neki.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);
	
	@Query(value = "FROM User u WHERE u.id = :id")
	public User buscarUsuarioById(@Param("id") Integer id);
}