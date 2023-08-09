package com.neki.rodrigobastos.neki.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neki.rodrigobastos.neki.entity.Role;
import com.neki.rodrigobastos.neki.entity.RoleEnum;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Optional<Role> findByName(RoleEnum name);
}