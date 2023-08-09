package com.neki.rodrigobastos.neki.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neki.rodrigobastos.neki.entity.User;
import com.neki.rodrigobastos.neki.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username).orElse(null);
	}
}
