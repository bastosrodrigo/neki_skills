package com.neki.rodrigobastos.neki.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neki.rodrigobastos.neki.entity.Skill;
import com.neki.rodrigobastos.neki.repository.SkillRepository;
import com.neki.rodrigobastos.neki.repository.UserRepository;

@Service
public class SkillService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SkillRepository skillRepository;

	public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    public Skill getSkillsById(Integer id) {
        return skillRepository.findById(id).orElse(null);
    }
    
    public List<Skill> getSkillByIdUsuario(Integer id) {
    	return skillRepository.buscarSkill(id);
    }
    
    public Skill saveSkills(Skill skills) {
        return skillRepository.save(skills);
    }
    
    public Skill updateSkills(Skill skills, Integer id) {
        return skillRepository.save(skills);
    }
    
    public boolean deleteSkills(Integer id) {
        skillRepository.deleteById(id);
        Skill skillsDeletado = skillRepository.findById(id).orElse(null);
        if (null == skillsDeletado) {
            return true;
        } else {
            return false;
        }
    }
}