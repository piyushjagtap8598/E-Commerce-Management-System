package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;

@Service
public class UserService 
{
	@Autowired
	private UserRepository userrepository;
	
	public User registerUser(User user)
	{
		user.setRole("USER");
		return userrepository.save(user);
	}
	public String loginUser(String email,String password)
	{
		User user= userrepository.findByEmail(email).orElse(null);
		if(user == null)
		{
			return "User Not Found";
		}
		if(!user.getPassword().equals(password))
		{
			return "Invalid Password";
		}
		return "Login Success";
	}
	
	public User authenticateUser(String email,String password)
	{
		User user=userrepository.findByEmail(email).orElse(null);
		if(user == null)
		{
			return null;
		}
		if(! user.getPassword().equals(password))
		{
			return null;
		}
		return user;
	}

}
