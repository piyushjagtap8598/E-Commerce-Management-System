package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Order;
import com.ecommerce.repository.OrderRepository;

@Service
public class OrderService 
{
	@Autowired
	private OrderRepository orderrepository;
	
	public Order placeOrder(Order order)
	{
		order.setStatus("Placed");
		if(order.getOrderitems() != null)
		{
			order.getOrderitems().forEach(item ->{item.setOrder(order);});
		}
		return orderrepository.save(order);
	}
	
	public List<Order> getAllOrders()
	{
		return orderrepository.findAll();
	}
	
	public Order getOrderById(Long id)
	{
		return orderrepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
	}

}
