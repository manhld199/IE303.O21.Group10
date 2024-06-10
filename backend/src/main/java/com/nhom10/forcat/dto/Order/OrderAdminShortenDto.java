package com.nhom10.forcat.dto.Order;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.model.Order.OrderBuyer;

public class OrderAdminShortenDto {
    @JsonProperty("order_id")
    private ObjectId orderId;

    @JsonProperty("order_buyer")
    private OrderBuyer orderBuyer;

    @JsonProperty("order_total_cost")
    private double orderTotalCost;

    @JsonProperty("order_process_info")
    private String orderProcessInfo;


    public OrderAdminShortenDto(Order order) {
        this.orderId = order.getOrderId();
        this.orderBuyer = order.getOrderBuyer();
        this.orderTotalCost = order.getOrderTotalCost();
        this.orderProcessInfo = order.getOrderProcessInfo();
    }
}


