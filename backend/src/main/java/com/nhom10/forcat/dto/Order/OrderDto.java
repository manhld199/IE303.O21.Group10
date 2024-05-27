package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    @JsonProperty("order_note")
    private String orderNote;

    @JsonProperty("order_buyer")
    private OrderBuyerDto orderBuyer;

    @JsonProperty("order_detail")
    private List<OrderDetailDto> orderDetailList;

    @JsonProperty("order_shipping_cost")
    private double orderShippingCost;

    @JsonProperty("order_total_cost")
    private double orderTotalCost;

    public OrderDto(String orderNote, OrderBuyerDto orderBuyer, List<OrderDetailDto> orderDetailList, double orderShippingCost, double orderTotalCost) {
        this.orderNote = orderNote;
        this.orderBuyer = orderBuyer;
        this.orderDetailList = orderDetailList;
        this.orderShippingCost = orderShippingCost;
        this.orderTotalCost = orderTotalCost;
    }
}
