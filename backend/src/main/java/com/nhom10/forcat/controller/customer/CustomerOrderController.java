package com.nhom10.forcat.controller.customer;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.dto.Order.OrderLookupDto;
import com.nhom10.forcat.service.customer.CustomerOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {
    @Autowired
    private CustomerOrderService orderService;

    @PostMapping("/createOrder")
    public ResponseEntity<Object> createOrder(@RequestBody OrderDto order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/lookup/{phoneNumber}")
    public ResponseEntity<OrderLookupDto> getLookupOrders(@PathVariable String phoneNumber) {
        return orderService.lookupOrdersByPhoneNumber(phoneNumber);
    }
}
