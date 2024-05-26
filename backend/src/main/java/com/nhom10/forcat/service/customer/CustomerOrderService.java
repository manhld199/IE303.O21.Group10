package com.nhom10.forcat.service.customer;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.mapper.OrderMapper;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CustomerOrderService {
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
