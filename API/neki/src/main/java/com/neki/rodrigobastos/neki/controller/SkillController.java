package com.neki.rodrigobastos.neki.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neki.rodrigobastos.neki.entity.Skill;
import com.neki.rodrigobastos.neki.entity.User;
import com.neki.rodrigobastos.neki.repository.UserRepository;
import com.neki.rodrigobastos.neki.services.SkillService;

@RestController
@RequestMapping ("/skill")
public class SkillController {
	
	@Autowired
    SkillService SkillService;

	@Autowired
	UserRepository userRepository;
	
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkill() {
        return new ResponseEntity<>(SkillService.getAllSkills(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Integer id) {
        Skill SkillResponse = SkillService.getSkillsById(id);
        if (null == SkillResponse)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(SkillResponse, HttpStatus.OK);
    }
    
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Skill>> getUsuarioById(@PathVariable Integer id) {
        List<Skill> SkillResponse = SkillService.getSkillByIdUsuario(id);
        if (null == SkillResponse)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(SkillResponse, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Skill> saveSkill(@RequestBody Skill Skill){
        return new ResponseEntity<>(SkillService.saveSkills(Skill), HttpStatus.CREATED);
    }
    
    @PostMapping("/{id}")
    public ResponseEntity<Skill> saveSkill(@RequestBody Skill Skill, @PathVariable Integer id) {
        User user = userRepository.buscarUsuarioById(id);
        if(user != null) {
            Skill.setUsuario(user);
            return new ResponseEntity<>(SkillService.saveSkills(Skill), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@RequestBody Skill Skill, @PathVariable Integer id) {
        Skill verificar = SkillService.getSkillsById(id);
        if (verificar == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        else
            return new ResponseEntity<>(SkillService.updateSkills(Skill, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delSkill(@PathVariable Integer id) {
        if (SkillService.getSkillsById(id) != null) {
            Boolean resp = SkillService.deleteSkills(id);
            if (resp)
                return new ResponseEntity<>(resp, HttpStatus.OK);
            else
                return new ResponseEntity<>(resp, HttpStatus.NOT_MODIFIED);
        } else
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
