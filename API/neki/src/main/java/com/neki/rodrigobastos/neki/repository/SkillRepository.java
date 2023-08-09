package com.neki.rodrigobastos.neki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.neki.rodrigobastos.neki.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer>{
	
	@Query(value = "FROM Skill i WHERE i.usuario.id = :id")
	public List<Skill> buscarSkill(@Param("id") Integer id);
}
