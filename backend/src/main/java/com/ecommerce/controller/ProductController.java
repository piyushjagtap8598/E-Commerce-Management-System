package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Product;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController 
{
	@Autowired
	private ProductService productservice;
	
	@PostMapping
	public Product addProduct(@RequestBody Product product)
	{
		return productservice.addProduct(product);
	}
	
	@GetMapping
	public List<Product> getAllProducts()
	{
		return productservice.getAllProducts();
	}
	
	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id,@RequestBody Product product)
	{
		return productservice.updateProduct(id, product);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable Long id)
	{
		return productservice.deleteProduct(id);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProduct(@RequestParam String keyword)
	{
		List<Product> products = productservice.searchProduct(keyword);
		return ResponseEntity.ok(products);
	}
	@GetMapping("/category/{id}")
	public ResponseEntity<List<Product>>getProductsByCategory(@PathVariable Long id)
	{
		List<Product> products = productservice.getProductByCategory(id);
		return ResponseEntity.ok(products);
	}

}
