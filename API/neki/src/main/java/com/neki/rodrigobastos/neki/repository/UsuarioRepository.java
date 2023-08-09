package com.neki.rodrigobastos.neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.neki.rodrigobastos.neki.entity.User;

public interface UsuarioRepository extends JpaRepository<User, Integer>{
    
    @Query(value = "FROM User u WHERE u.id = :id")
    public User buscarUsuarioById(@Param("id") Integer id);
}
