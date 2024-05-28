package com.nhom10.forcat.service.customer;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.dto.Order.OrderLookupDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.repository.Guest.GuestRepository;
import com.nhom10.forcat.repository.Order.OrderRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.nhom10.forcat.model.Guest.Guest;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private GuestRepository guestRepository;

    public ResponseEntity<Object> createOrder(OrderDto order) {
        try {
            Order addOrder = new Order(order);
            Order addedOrder = orderRepository.insert(addOrder);

            if (addedOrder == null)
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

            Optional<Guest> guestOptional = guestRepository
                    .findByGuestPhoneNumber(addedOrder.getOrderBuyer().getOrderPhone());

            if (!guestOptional.isPresent()) {
                Guest addGuest = new Guest(addedOrder.getOrderBuyer().getOrderPhone(), addedOrder.getOrderId(),
                        addedOrder.getOrderTotalCost());
                Guest addedGuest = guestRepository.insert(addGuest);

                if (addedGuest == null)
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                Guest guest = guestOptional.get();
                guest.updateOrder(addedOrder.getOrderId(), addedOrder.getOrderTotalCost());
                guestRepository.save(guest);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<OrderLookupDto> lookupOrdersByPhoneNumber(String phoneNumber) {
        try {
            Optional<Guest> guest = guestRepository.findByGuestPhoneNumber(phoneNumber);

            if (!guest.isPresent())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ObjectId> guestOrders = guest.get().getGuestOrders();

            if (guestOrders.size() == 0)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Order> orders = orderRepository.findOrdersByIds(guestOrders);

            OrderLookupDto returnedOrders = new OrderLookupDto(orders);

            return new ResponseEntity<>(returnedOrders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
