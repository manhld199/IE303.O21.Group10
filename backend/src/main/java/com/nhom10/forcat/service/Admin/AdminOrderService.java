package com.nhom10.forcat.service.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Order.OrderAdminShortenDto;
import com.nhom10.forcat.dto.Order.OrderAdminShortenPageDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Order.OrderRepository;

@Service
public class AdminOrderService {

    @Autowired
    OrderRepository orderRepository;

    public ResponseEntity<Order> getOrderByOrderId(ObjectId orderId) {
        try {
            Optional<Order> orderOptional = orderRepository.findById(orderId);

            if (!orderOptional.isPresent())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(orderOptional.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<OrderAdminShortenPageDto> getAllOrders(int p, int n) {
        try {
            Pageable pageable = PageRequest.of(p, n);
            Page<Order> page = orderRepository.findAllByOrderByCreatedAtDesc(pageable);
            List<Order> orders = page.getContent();
            int totalPages = page.getTotalPages();

            if (orders.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<OrderAdminShortenDto> shortenOrders = orders.stream()
                    .map(order -> new OrderAdminShortenDto(order))
                    .collect(Collectors.toList());

            OrderAdminShortenPageDto returnedOrders = new OrderAdminShortenPageDto(shortenOrders, totalPages);

            return new ResponseEntity<>(returnedOrders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}