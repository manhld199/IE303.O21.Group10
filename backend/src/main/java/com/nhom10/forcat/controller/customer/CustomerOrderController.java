package com.nhom10.forcat.controller.customer;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.service.customer.CustomerOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CustomerOrderController {
    @Autowired
    private CustomerOrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
        Order order = orderService.createOrder(orderDto);

        return ResponseEntity.status(201).body(order);
    }
}
