package com.nhom10.forcat.dto.Order;

import java.util.List;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.model.Order.OrderDetail;

import lombok.Data;

@Data
public class OrderLookupItemDto {

    @JsonProperty("order_id")
    private ObjectId orderId;

    @JsonProperty("order_process_info")
    private String orderProcessInfo;

    @JsonProperty("order_details")
    private List<OrderDetail> orderDetails;

    @JsonProperty("order_total_cost")
    private double orderTotalCost;

    public OrderLookupItemDto(Order order) {
        this.orderId = order.getOrderId();
        this.orderProcessInfo = order.getOrderProcessInfo();
        this.orderDetails = order.getOrderDetails();
        this.orderTotalCost = order.getOrderTotalCost();
    }

}
