package com.nhom10.forcat.service;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Order.OrderRepository;
import com.nhom10.forcat.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    public Order createOrder(OrderDto orderDto) {
        Order order = orderMapper.toModel(orderDto);
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());

        return orderRepository.save(order);
    }
}
