package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Order.OrderBuyer;
import com.nhom10.forcat.model.Order.OrderDetail;

import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    @JsonProperty("order_note")
    private String orderNote;

    @JsonProperty("order_buyer")
    private OrderBuyer orderBuyer;

    @JsonProperty("order_details")
    private List<OrderDetail> orderDetails;

    @JsonProperty("order_total_cost")
    private double orderTotalCost;
}
