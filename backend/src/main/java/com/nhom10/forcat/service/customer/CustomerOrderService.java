package com.nhom10.forcat.service.customer;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.mapper.OrderMapper;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Guest.GuestRepository;
import com.nhom10.forcat.repository.Order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nhom10.forcat.model.Guest.Guest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Transactional
    public Order createOrder(OrderDto orderDto) {
        Order order = orderMapper.toModel(orderDto);
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        Order savedOrder = orderRepository.save(order);

        String guestPhoneNumber = orderDto.getOrderBuyer().getOrderPhone();
        Optional<Guest> guestOptional = guestRepository.findByGuestPhoneNumber(guestPhoneNumber);

        Guest guest;
        if (guestOptional.isPresent()) {
            guest = guestOptional.get();
            guest.getGuestOrders().add(savedOrder.getOrderId());
            guest.setGuestTotalSpent(guest.getGuestTotalSpent() + orderDto.getOrderTotalCost());
            guest.setUpdatedAt(new Date());
        } else {
            guest = new Guest();
            guest.setGuestPhoneNumber(guestPhoneNumber);
            guest.setGuestOrders(List.of(savedOrder.getOrderId()));
            guest.setGuestTotalSpent(orderDto.getOrderTotalCost());
            guest.setCreatedAt(new Date());
            guest.setUpdatedAt(new Date());
        }

        guestRepository.save(guest);

        return savedOrder;
    }
}

