package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderBuyerDto {
    @JsonProperty("order_name")
    private String orderName;

    @JsonProperty("order_phone")
    private String orderPhone;

    @JsonProperty("order_address")
    private OrderAddressDto orderAddress;

    public OrderBuyerDto(String orderName, String orderPhone, OrderAddressDto orderAddress) {
        this.orderName = orderName;
        this.orderPhone = orderPhone;
        this.orderAddress = orderAddress;
    }
}
