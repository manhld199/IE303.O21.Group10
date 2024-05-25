package com.nhom10.forcat.service;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.mapper.OrderMapper;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Order.OrderRepository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public OrderDto createOrder(OrderDto orderDto) {
        Order order = OrderMapper.INSTANCE.toModel(orderDto);
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order = orderRepository.save(order);
        return OrderMapper.INSTANCE.toDTO(order);
    }
}
