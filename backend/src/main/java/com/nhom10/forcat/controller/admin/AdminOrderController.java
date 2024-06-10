package com.nhom10.forcat.controller.admin;


// import java.util.List;
// import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Order.OrderAdminShortenPageDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.service.admin.AdminOrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    AdminOrderService orderService;

    // @Autowired
    // AdminSearchService searchService;

    @GetMapping("/getOrder/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        ObjectId orderObjectId = new ObjectId(orderId);
        return orderService.getOrderByOrderId(orderObjectId);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<OrderAdminShortenPageDto> getAllOrders(
            // @RequestParam(required = true) String q,
            @RequestParam(required = true) int p) {
        // if (!q.isEmpty())
        //     return searchService.getAdminSearchCategories(q, p, 15);

        return orderService.getAllOrders(p, 10);
    }
}
