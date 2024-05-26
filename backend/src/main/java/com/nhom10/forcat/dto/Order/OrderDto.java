package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    @JsonProperty("guest_id")
    private ObjectId guestId;

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

    public OrderDto(ObjectId guestId, String orderNote, OrderBuyerDto orderBuyer, List<OrderDetailDto> orderDetailList, double orderShippingCost, double orderTotalCost) {
        this.guestId = guestId;
        this.orderNote = orderNote;
        this.orderBuyer = orderBuyer;
        this.orderDetailList = orderDetailList;
        this.orderShippingCost = orderShippingCost;
        this.orderTotalCost = orderTotalCost;
    }
}
